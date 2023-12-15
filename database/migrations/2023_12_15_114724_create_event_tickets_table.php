<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('event_tickets', function (Blueprint $table) {
            $table->id();

            $table->string('name');

            $table->float('current_price')->nullable();
            $table->float('original_price')->nullable();
            $table->string('base_currency')->default('USD');

            $table->dateTime('tickets_purchasable_at')->nullable();
            $table->integer('tickets_purchased')->nullable();
            $table->integer('tickets_available')->nullable();

            $table->foreignId('event_id')->nullable()->constrained('events')->onDelete('cascade');
            $table->foreignId('venue_id')->nullable()->constrained('venues')->onDelete('cascade');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_tickets');
    }
};
