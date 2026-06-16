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

    public function addItem(Request $request, int $productId, int $cart_item_qt = 1)
    {
        $product = Product::findOrFail($productId);
        $identifier = $this->getCartIdentifier($request);

        $cartItem = CartItem::firstOrNew(
            array_merge($identifier, ['product_id' => $productId])
        );

        $cartItem->cart_item_qt = ($cartItem->cart_item_qt ?? 0) + $cart_item_qt;
        $cartItem->price_snapshot = $product->amount;
        $cartItem->save();

        return $cartItem;
    }

    public function updateQuantity(Request $request, int $productId, int $cart_item_qt)
    {
        $identifier = $this->getCartIdentifier($request);

        return CartItem::where($identifier)
            ->where('product_id', $productId)
            ->update(['cart_item_qt' => $cart_item_qt]);
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

        $query = CartItem::where($identifier)
            ->with('product')
            ->get();

        $cart = collect();

        foreach ($query as $item) {
            $cart->push([
                'id' => $item->id,
                'product_id' => $item->product_id,
                'cart_item_qt' => $item->cart_item_qt,
                'price_snapshot' => $item->price_snapshot,
                'product' => collect($item->product)->only(['id', 'name', 'amount', 'image']),
            ]);
        }

        return $cart;
    }

    public function getTotal(Request $request)
    {
        $cart = $this->getCart($request);
        $total = 0;
        foreach ($cart as $item) {
            $total += $item['cart_item_qt'] * $item['price_snapshot'];
        }
        return $total;
    }

    public function getCount(Request $request)
    {
        $identifier = $this->getCartIdentifier($request);

        return CartItem::where($identifier)->sum('cart_item_qt');
    }

    public function getPromotion(Request $request)
    {
        $cart = $this->getCart($request);
        $promotions = collect();

        foreach ($cart as $item) {
            $promotions = $promotions->merge(Product::with('promotions')
                ->find($item['product_id'])
                ->promotions);
        }

        return $promotions->unique('id')->values();
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
