<?php

namespace App\Http\Controllers;

use App\Services\CartServices;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartItemController extends Controller
{
    public function __construct(
        private CartServices $cartService
    ) {}

    public function index(Request $request)
    {
        return Inertia::render('Cart/Index', [
            'cartItems' => $this->cartService->getCart($request),
            'total' => $this->cartService->getTotal($request),
        ]);
    }

    public function add(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'integer|min:1',
        ]);

        $this->cartService->addItem(
            $request,
            $validated['product_id'],
            $validated['quantity'] ?? 1
        );

        return back()->with('success', 'Produto adicionado ao carrinho');
    }

    public function update(Request $request, int $productId)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $this->cartService->updateQuantity($request, $productId, $validated['quantity']);

        return response()->noContent();
    }

    public function updateBulk(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array',
            'items.*.product_id' => 'required|integer|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        foreach ($validated['items'] as $item) {
            $this->cartService->updateQuantity($request, $item['product_id'], $item['quantity']);
        }

        return redirect()->route('checkout'); // deixa o Laravel/Inertia redirecionar
    }

    public function remove(Request $request, int $productId)
    {
        $this->cartService->removeItem($request, $productId);

        return back()->with('success', 'Produto removido do carrinho');
    }
}
