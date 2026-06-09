<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use App\Services\ProductServices;

class ProductController extends Controller
{
    public function __construct(private ProductServices $service) {}

    public function index()
    {
        // $this->syncEntireProductDatabase();
        return $this->service::listProductsAndApplyPromotions();
    }

    public function create()
    {
        //
    }

    public function store(StoreProductRequest $request)
    {
        //
    }

    public function show(Product $product)
    {
        return $this->service::showProductDetailsAndApplyPromotion($product);
    }

    public function edit(Product $product)
    {
        //
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        //
    }

    public function destroy(Product $product)
    {
        //
    }

    public function syncEntireProductDatabase()
    {
        $products = $this->service::getProductsFromJetstockAPI();
        $this->service::syncDatabase($products);
    }
}
