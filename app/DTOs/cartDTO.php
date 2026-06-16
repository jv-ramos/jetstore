<?php

namespace App\DTOs;

class cartDTO
{
    public $items;
    public $total;
    public $count;
    public $promotion;

    public function __construct($items, $total, $count, $promotion = null)
    {
        $this->items = $items;
        $this->total = $total;
        $this->count = $count;
        $this->promotion = $promotion;
    }
}
