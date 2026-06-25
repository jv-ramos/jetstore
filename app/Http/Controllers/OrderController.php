<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
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
        if (!$request->user()) {
            return redirect()->route('dashboard')->with('error', 'Acesso negado');
        }

        $orders = $this->getOrders($request);

        return Inertia::render('orders/index', [
            'orders' => $orders,
        ]);
    }

    public function getOrders(Request $request)
    {
        if (!$request->user()) return null;

        $orders = Order::where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        $productIds = collect($orders->items())
            ->flatMap(fn($order) => collect($order->order_items)->pluck('product_id'))
            ->unique()
            ->values();

        $products = Product::whereIn('id', $productIds)
            ->get()
            ->keyBy('id');

        $orders->getCollection()->transform(function ($order) use ($products) {
            $order->order_items = collect($order->order_items)
                ->map(fn($item) => array_merge($item, [
                    'product' => $products->get($item['product_id']),
                ]))
                ->toArray();

            return $order;
        });

        return $orders;
    }

    public function show(Order $order)
    {
        if ($order->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('orders/show', [
            'order' => $this->enrichOrderItems($order),
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

    private function enrichOrderItems(Order $order, $products = null)
    {
        $items = is_string($order->order_items)
            ? json_decode($order->order_items, true)
            : ($order->order_items ?? []);

        if ($products === null) {
            $productIds = collect($items)->pluck('product_id')->unique();
            $products = Product::whereIn('id', $productIds)->get()->keyBy('id');
        }

        $order->order_items = collect($items)
            ->map(fn($item) => array_merge($item, [
                'product' => $products->get($item['product_id']),
            ]))
            ->toArray();

        return $order;
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

            return Inertia::render("order/{$order->id}", $order)
                ->with('success', 'Pedido criado com sucesso!');
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
