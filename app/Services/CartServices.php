<?php

namespace App\Services;

use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;

class CartServices
{
    public function getCartIdentifier(Request $request)
    {
        return $request->user()
            ? ['user_id' => $request->user()->id]
            : ['session_id' => $request->session()->getId()];
    }

    public function addItem(Request $request, int $productId, int $quantity = 1)
    {
        $product = Product::findOrFail($productId);
        $identifier = $this->getCartIdentifier($request);

        $cartItem = CartItem::firstOrNew(
            array_merge($identifier, ['product_id' => $productId])
        );

        $cartItem->quantity = ($cartItem->quantity ?? 0) + $quantity;
        $cartItem->price_snapshot = $product->amount;
        $cartItem->save();

        return $cartItem;
    }

    public function updateQuantity(Request $request, int $productId, int $quantity)
    {
        $identifier = $this->getCartIdentifier($request);

        return CartItem::where($identifier)
            ->where('product_id', $productId)
            ->update(['quantity' => $quantity]);
    }

    public function removeItem(Request $request, int $productId)
    {
        $identifier = $this->getCartIdentifier($request);

        return CartItem::where($identifier)
            ->where('product_id', $productId)
            ->delete();
    }

    public function getCart(Request $request)
    {
        $identifier = $this->getCartIdentifier($request);

        return CartItem::where($identifier)
            ->with('product')
            ->get();
    }

    public function getTotal(Request $request)
    {
        return $this->getCart($request)->sum('subtotal');
    }

    public function clearCart(Request $request)
    {
        $identifier = $this->getCartIdentifier($request);

        return CartItem::where($identifier)->delete();
    }

    public function mergeSessionCart(Request $request)
    {
        $sessionId = $request->session()->getId();
        $userId = $request->user()->id;

        CartItem::where('session_id', $sessionId)
            ->update(['user_id' => $userId, 'session_id' => null]);
    }
}
