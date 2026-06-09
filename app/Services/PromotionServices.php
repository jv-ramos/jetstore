<?php

namespace App\Services;

use App\Models\Product;
use App\Models\Promotion;

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

    public static function makeDailyPromotion()
    {
        $products = Product::inRandomOrder()->take(5)->get();
        foreach ($products as $product) {
            Promotion::create([
                'product_id' => $product->id,
                'discount_percentage' => rand(10, 50),
                'start_date' => now(),
                'end_date' => now()->addDay(),
            ]);
        }
    }

    public static function endExpiredPromotions()
    {
        $expiredPromotions = Promotion::where('end_date', '<', now())->get();
        foreach ($expiredPromotions as $promotion) {
            $promotion->delete();
        }
    }
}
