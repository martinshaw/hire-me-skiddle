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
        Schema::create('visitor_bans', function (Blueprint $table) {
            $table->id();

            $table->string('reason')->nullable();

            $table->foreignId('visitor_id')->nullable()->constrained('visitors')->onDelete('cascade');
            $table->foreignId('event_id')->nullable()->constrained('events')->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visitor_bans');
    }
};
