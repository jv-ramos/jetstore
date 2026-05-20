<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(
    'user_id',
    'CEP',
    'state',
    'city',
    'neighbourhood',
    'street',
    'number',
    'complement',
)]
class Address extends Model
{
    /** @use HasFactory<\Database\Factories\AddressFactory> */
    use HasFactory;

    public function user() {
        return $this->belongsTo(User::class);
    }
}
