<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePromotionRequest;
use App\Http\Requests\UpdatePromotionRequest;
use App\Models\Promotion;
use App\Services\PromotionServices;

class PromotionController extends Controller
{
    public function __construct(private PromotionServices $service) {}

    public function index()
    {
        return $this->service::listPromotedProducts();
    }

    public function create()
    {
        //
    }

    public function store(StorePromotionRequest $request)
    {
        //
    }

    public function show(Promotion $promotion)
    {
        //
    }

    public function edit(Promotion $promotion)
    {
        //
    }

    public function update(UpdatePromotionRequest $request, Promotion $promotion)
    {
        //
    }

    public function destroy(Promotion $promotion)
    {
        //
    }
}
