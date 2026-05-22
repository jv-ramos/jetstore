<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->unsignedBigInteger('external_order_id')->nullable();
            $table->string('external_id')->nullable();
            $table->unsignedBigInteger('gateway_id')->nullable();

            $table->string('order_number')->unique();
            $table->enum('status', [
                'pending',
                'processing',
                'paid',
                'charged_back',
                'refunded',
                'failed',
            ])->default('pending');

            $table->bigInteger('amount');
            $table->string('card_last_numbers', 4)->nullable();

            $table->json('order_items');

            $table->text('notes')->nullable();
            $table->json('api_response')->nullable();

            $table->timestamps();

            $table->index('external_order_id');
            $table->index('external_id');
            $table->index('order_number');
            $table->index('status');
            $table->index('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
