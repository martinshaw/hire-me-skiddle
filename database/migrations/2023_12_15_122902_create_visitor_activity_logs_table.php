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
        Schema::create('visitor_activity_logs', function (Blueprint $table) {
            $table->id();

            $table->string('type')->default('other');
            $table->string('importance')->default('info');
            $table->longText('message')->nullable();
            $table->string('location')->default('website');

            $table->foreignId('visitor_id')->nullable()->constrained('visitors');
            $table->foreignId('event_id')->nullable()->constrained('events');
            $table->foreignId('user_id')->nullable()->constrained('users');
            $table->foreignId('event_ticket_purchase_id')->nullable()->constrained('event_ticket_purchases');
            $table->foreignId('event_ticket_id')->nullable()->constrained('event_tickets');
            $table->foreignId('visitor_ban_id')->nullable()->constrained('visitor_bans');
            $table->foreignId('visitor_contact_detail_id')->nullable()->constrained('visitor_contact_details');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visitor_activity_logs');
    }
};
