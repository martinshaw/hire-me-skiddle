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
        Schema::create('event_ticket_purchases', function (Blueprint $table) {
            $table->id();

            $table->float('purchase_price')->nullable();
            $table->string('purchase_currency')->default('USD');

            $table->string('entry_barcode')->nullable();
            $table->string('entry_code')->nullable();

            $table->dateTime('resold_at')->nullable();
            $table->foreignId('resold_by_id')->nullable()->constrained('users');
            $table->foreignId('resold_as_id')->nullable()->constrained('event_ticket_purchases');

            $table->dateTime('refunded_at')->nullable();
            $table->foreignId('refunded_by_id')->nullable()->constrained('users');
            $table->string('refunded_reason')->nullable();

            $table->foreignId('event_ticket_id')->nullable()->constrained('event_tickets')->onDelete('cascade');
            $table->foreignId('event_id')->nullable()->constrained('events')->onDelete('cascade');
            $table->foreignId('venue_id')->nullable()->constrained('venues')->onDelete('cascade');
            $table->foreignId('visitor_id')->nullable()->constrained('visitors')->onDelete('cascade');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_ticket_purchases');
    }
};
