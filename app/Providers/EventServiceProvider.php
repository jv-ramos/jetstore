<?php

namespace App\Providers;

use App\Listeners\MergeCartOnLogin;
use Illuminate\Auth\Events\Login;
use Illuminate\Support\ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        Login::class => [
            MergeCartOnLogin::class,
        ],
    ];
}
