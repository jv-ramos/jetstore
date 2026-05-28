<?php

use App\Http\Controllers\CartItemController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use Inertia\Inertia;

// Route::get('products', [ProductController::class, 'index'])->name('product.index');

Route::inertia('/', 'dashboard', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::inertia('dashboard', 'dashboard', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('dashboard');

Route::inertia('products/{product}', 'productDetails', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('product-details');

// Route::get('/products/{product}', function () {
//     return Inertia::render('products/show');
// });

Route::fallback(fn() => Inertia::render('Errors/NotFound', [], 404)->toResponse(request())->setStatusCode(404));

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('cart', 'userCart')->name('cart');

    Route::post('/cart/add', [CartItemController::class, 'add']);
    Route::patch('/cart/update/{product}', [CartItemController::class, 'update']);
    Route::patch('/cart/update-bulk', [CartItemController::class, 'updateBulk']);
    Route::delete('/cart/remove/{product}', [CartItemController::class, 'remove']);

    Route::inertia('checkout', 'checkout')->name('checkout');

    // Route::inertia('orders', 'notFound')->name('not-found');
    // Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show');
    // Route::get('/orders/checkout', [OrderController::class, 'checkout'])->name('orders.checkout');
    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
    Route::post('/orders/{order}/sync', [OrderController::class, 'sync'])->name('orders.sync');
});

require __DIR__ . '/settings.php';
