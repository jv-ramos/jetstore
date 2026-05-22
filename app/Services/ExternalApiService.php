<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ExternalApiService
{
    private string $baseUrl;
    private ?string $apiKey;

    public function __construct()
    {
        $this->baseUrl = config('services.external_api.base_url');
        // $this->apiKey = config('services.external_api.key');
    }

    public function createOrder(array $orderData)
    {
        try {
            $response = Http::timeout(30)
                ->withHeaders($this->getHeaders())
                ->post("{$this->baseUrl}", $orderData);

            if ($response->failed()) {
                Log::error('External API order creation failed', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                    'data' => $orderData,
                ]);

                throw new \Exception(
                    $response->json('message') ?? 'Erro ao processar pedido na API externa'
                );
            }

            return $response->json();
        } catch (\Exception $e) {
            Log::error('External API exception', [
                'message' => $e->getMessage(),
                'data' => $orderData,
            ]);

            throw $e;
        }
    }

    public function getOrderStatus(string $externalId)
    {
        $response = Http::withHeaders($this->getHeaders())
            ->get("{$this->baseUrl}/orders/{$externalId}");

        if ($response->failed()) {
            throw new \Exception('Erro ao buscar status do pedido');
        }

        return $response->json();
    }

    private function getHeaders(): array
    {
        $headers = [
            'Accept' => 'application/json',
            'Content-Type' => 'application/json',
        ];

        // if ($this->apiKey) {
        //     $headers['Authorization'] = "Bearer {$this->apiKey}";
        // }

        return $headers;
    }
}
