<?php

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
});

require __DIR__ . '/settings.php';
