<?php

namespace App\Listeners;

class MergeCartOnLogin
{
    public function __construct(
        private CartServices $cartService
    ) {}

    public function handle(Login $event)
    {
        $this->cartService->mergeSessionCart(request());
    }
}
