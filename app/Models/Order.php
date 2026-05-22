<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(
    'user_id',
    'external_order_id',
    'external_id',
    'gateway_id',
    'order_number',
    'status',
    'amount',
    'card_last_numbers',
    'order_items',
    'card_number_encrypted',
    'cvv_encrypted',
    'notes',
    'api_response',
)]
class Order extends Model
{
    protected $casts = [
        'order_items' => 'array',
        'api_response' => 'array',
        'amount' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function generateOrderNumber()
    {
        $year = now()->year;
        $lastOrder = self::whereYear('created_at', $year)
            ->orderBy('id', 'desc')
            ->first();

        $number = $lastOrder ? ((int) substr($lastOrder->order_number, -5)) + 1 : 1;

        return sprintf('ORD-%d-%05d', $year, $number);
    }

    public function getAmountInReaisAttribute()
    {
        return $this->amount / 100;
    }

    public function getFormattedAmountAttribute()
    {
        return 'R$ ' . number_format($this->amount_in_reais, 2, ',', '.');
    }

    public function getItemsAttribute()
    {
        return collect($this->order_items);
    }
}
