<?php

namespace App\Services;

use App\Models\Product;

class PromotionServices
{
    public static function listPromotedProducts()
    {
        $products = Product::whereHas('promotions')->with('promotions')->paginate(20);
        foreach ($products as $product) {
            $activePromotion = $product->promotions()
                ->where('start_date', '<=', now())
                ->where('end_date', '>=', now())
                ->first();

            if ($activePromotion) {
                $discount = $activePromotion->discount_percentage;
                $product->amount = round($product->amount * (1 - $discount / 100), 2);
            }
        }
        return $products;
    }
}
