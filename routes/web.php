<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

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
// Route::middleware(['auth', 'verified'])->group(function () {
// });

require __DIR__ . '/settings.php';
