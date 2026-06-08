<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

class ProductServices
{
    public static function listProductsAndApplyPromotions()
    {
        $products = Product::with('promotions')->paginate(20);
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

    public static function showProductDetailsAndApplyPromotion(Product $product)
    {
        $activePromotion = $product->promotions()
            ->where('start_date', '<=', now())
            ->where('end_date', '>=', now())
            ->first();

        if ($activePromotion) {
            $discount = $activePromotion->discount_percentage;
            $product->amount = round($product->amount * (1 - $discount / 100), 2);
        }
        return $product;
    }

    public static function getProductsFromJetstockAPI()
    {
        $counter = 1;
        do {
            $response = Http::get(config('api.products_api_url') . '/products', "page={$counter}");
            $counter++;
            echo ($response['meta']['last_page']);
        } while ($response['meta']['last_page'] > $response['meta']['current_page']);

        return $response->json('data');
    }

    public static function syncDatabase($externalProducts)
    {
        try {
            foreach ($externalProducts as $externalProduct) {
                Product::updateOrCreate(
                    ['external_id' => $externalProduct['id']],
                    [
                        'name' => $externalProduct['name'],
                        'image' => $externalProduct['image'],
                        'description' => $externalProduct['description'],
                        'amount' => $externalProduct['amount'],
                        'quantity' => $externalProduct['quantity'],
                    ]
                );
            }

            return ['success' => true];
        } catch (Throwable $e) {
            Log::error('Erro ao sincronizar produtos: ' . $e->getMessage());
            throw $e;
        }
    }
}
