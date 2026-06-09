<?php

namespace App\Http\Middleware;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\Address;
use App\Services\CartServices;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PromotionController;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
                'address' => $request->user() ? Address::where('user_id', $request->user()->id)->first() : null,
                'cart' => fn() => [
                    'items' => app(CartServices::class)->getCart($request),
                    'total' => app(CartServices::class)->getTotal($request),
                    'count' => app(CartServices::class)->getCart($request)->sum('quantity'),
                ],
            ],
            'products' => fn() => $this->shouldLoadProducts($request)
                ? app(ProductController::class)->index()
                : null,
            'promotions' => fn() => $this->shouldLoadProducts($request)
                ? app(PromotionController::class)->index()
                : null,
            'product' => fn() => $this->shouldLoadProduct($request)
                ? app(ProductController::class)->show(Product::with('promotions')->find($request->route('product'))) : null,
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }

    private function shouldLoadProducts(Request $request): bool
    {
        return $request->routeIs('products.*')
            || $request->routeIs('dashboard')
            || $request->routeIs('home');
    }

    private function shouldLoadProduct(Request $request): bool
    {
        return $request->routeIs('product-details');
    }

    private function loadPromotions(Request $request)
    {
        if ($this->shouldLoadProducts($request)) {
            $products = [];
            $promo = Product::with('promotions')->get()->pluck('promotions')->flatten();
            foreach ($promo as $p) {
                $product = Product::find($p->product_id);
                if ($product) {
                    $products[] = $product;
                }
            }
            return $products;
        }
        return null;
    }
}
