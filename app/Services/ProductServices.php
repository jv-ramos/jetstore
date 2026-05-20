<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

class ProductServices
{
    public static function getProductsFromJetstockAPI()
    {
        $response = Http::get(config('api.products_api_url') . '/products', 'page=1');

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
