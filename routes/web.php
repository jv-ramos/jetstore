<?php

use App\Http\Controllers\CartItemController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::get('products', [ProductController::class, 'index'])->name('product.index');

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
Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('cart', 'userCart')->name('cart');

    Route::post('/cart/add', [CartItemController::class, 'add']);
    Route::patch('/cart/update/{product}', [CartItemController::class, 'update']);
    Route::patch('/cart/update-bulk', [CartItemController::class, 'updateBulk']);
    Route::post('/cart/remove/{product}', [CartItemController::class, 'remove']);

    Route::inertia('checkout', 'checkout')->name('checkout');
});

require __DIR__ . '/settings.php';
