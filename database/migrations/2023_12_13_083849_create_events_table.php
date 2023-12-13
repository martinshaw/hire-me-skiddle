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
        Schema::create('events', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->longText('description')->nullable();
            $table->string('start_date')->nullable();
            $table->string('end_date')->nullable();
            $table->string('category')->nullable();

            $table->dateTime('cancelled_at')->nullable();
            $table->foreignId('cancelled_by_id')->nullable()->constrained('users');
            $table->string('cancelled_reason')->nullable();

            $table->dateTime('postponed_at')->nullable();
            $table->foreignId('postponed_by_id')->nullable()->constrained('users');
            $table->string('postponed_reason')->nullable();

            $table->dateTime('tickets_purchasable_at')->nullable();
            $table->integer('tickets_purchased')->nullable();
            $table->integer('tickets_available')->nullable();

            $table->foreignId('artist_id')->nullable()->constrained('artists');
            $table->foreignId('venue_id')->nullable()->constrained('venues');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
