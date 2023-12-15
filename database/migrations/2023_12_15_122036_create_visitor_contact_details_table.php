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
        Schema::create('visitor_contact_details', function (Blueprint $table) {
            $table->id();

            $table->string('type')->default('note');
            $table->longText('value')->nullable();

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
        Schema::dropIfExists('visitor_contact_details');
    }
};
