<?php

namespace App\Services;

use App\Models\Order;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Crypt;

class OrderServices
{
    public function __construct(
        private CartServices $cartService,
        private ExternalApiService $externalApi
    ) {}

    public function createFromCart($request, array $paymentData)
    {
        $cartItems = $this->cartService->getCart($request);

        if ($cartItems->isEmpty()) {
            throw new \Exception('Carrinho está vazio');
        }

        return DB::transaction(function () use ($request, $cartItems, $paymentData) {
            $user = $request->user();

            $apiPayload = [
                'client_id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'card_number' => $paymentData['card_number'],
                'cvv' => $paymentData['cvv'],
                'cart' => $cartItems->map(fn($item) => [
                    'product_id' => $item->product_id,
                    'quantity' => $item->cart_item_qt,
                ])->toArray(),
            ];

            $apiResponse = $this->externalApi->createOrder($apiPayload);

            $order = Order::create([
                'user_id' => $user->id,
                'external_order_id' => $apiResponse['id'],
                'external_id' => $apiResponse['external_id'],
                'gateway_id' => $apiResponse['gateway_id'] ?? null,
                'order_number' => Order::generateOrderNumber(),
                'status' => $apiResponse['status'],
                'amount' => $apiResponse['amount'],
                'card_last_numbers' => $apiResponse['card_last_numbers'],
                'order_items' => $apiResponse['order'], // Armazena o array de produtos
                'card_number_encrypted' => Crypt::encryptString($paymentData['card_number']),
                'cvv_encrypted' => Crypt::encryptString($paymentData['cvv']),
                'api_response' => $apiResponse, // Armazena resposta completa
            ]);

            $this->cartService->clearCart($request);

            return $order;
        });
    }

    public function syncOrderStatus(Order $order)
    {
        if (!$order->external_id) {
            throw new \Exception('Pedido não possui ID externo');
        }

        $apiResponse = $this->externalApi->getOrderStatus($order->external_id);

        $order->update([
            'status' => $apiResponse['status'],
            'amount' => $apiResponse['amount'],
            'order_items' => $apiResponse['order'],
            'api_response' => $apiResponse,
        ]);

        return $order;
    }
}
