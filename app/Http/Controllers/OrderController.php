<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Services\OrderServices;
use App\Services\CartServices;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function __construct(
        private OrderServices $orderService,
        private CartServices $cartService
    ) {}

    public function index(Request $request)
    {
        $orders = Order::where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Orders/Index', [
            'orders' => $orders,
        ]);
    }

    public function show(Order $order)
    {
        if ($order->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('Orders/Show', [
            'order' => $order,
        ]);
    }

    public function checkout(Request $request)
    {
        $cartItems = $this->cartService->getCart($request);

        if ($cartItems->isEmpty()) {
            return redirect()->route('products.index')
                ->with('error', 'Seu carrinho está vazio');
        }

        return Inertia::render('Orders/Checkout', [
            'cartItems' => $cartItems,
            'total' => $cartItems->sum('subtotal'),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'card_number' => 'required|string|min:13|max:19',
            'cvv' => 'required|string|size:3',
            'notes' => 'nullable|string|max:500',
        ]);

        try {
            $order = $this->orderService->createFromCart($request, [
                'card_number' => $validated['card_number'],
                'cvv' => $validated['cvv'],
            ]);

            if ($validated['notes'] ?? false) {
                $order->update(['notes' => $validated['notes']]);
            }

            // return redirect()->route('orders.show', $order)
            //     ->with('success', 'Pedido criado com sucesso!');

        } catch (\Exception $e) {
            return back()
                ->withInput()
                ->with('error', $e->getMessage());
        }
    }

    public function sync(Order $order)
    {
        if ($order->user_id !== auth()->id()) {
            abort(403);
        }

        try {
            $this->orderService->syncOrderStatus($order);

            return back()->with('success', 'Status atualizado com sucesso');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}
