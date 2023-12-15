<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EventTicket extends Model
{
    use HasFactory,
    SoftDeletes,
    HasTimestamps;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',

        'current_price',
        'original_price',
        'base_currency',

        'tickets_purchasable_at',
        'tickets_purchased',
        'tickets_available',

        'event_id',
        'venue_id',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'tickets_purchasable_at' => 'datetime',
    ];

    /**
     * The attributes that should be mutated to dates.
     */
    protected $dates = [
        'tickets_purchasable_at',
    ];

    /**
     * The attributes that should be appended.
     */
    protected $appends = [
        'formatted_current_price',
        'formatted_original_price',
    ];

    /**
     * Get the event that owns the ticket.
     */
    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    /**
     * Get the venue that owns the ticket.
     */
    public function venue()
    {
        return $this->belongsTo(Venue::class);
    }

    /**
     * Get the formatted current price.
     */
    public function getFormattedCurrentPriceAttribute()
    {
        if ($this->base_currency === 'USD') return '$' . number_format($this->current_price, 2);
        if ($this->base_currency === 'GBP') return '£' . number_format($this->current_price, 2);
        if ($this->base_currency === 'EUR') return number_format($this->current_price, 2) . '€';

        return '$' . number_format($this->current_price, 2);
    }

    /**
     * Get the formatted original price.
     */
    public function getFormattedOriginalPriceAttribute()
    {
        if ($this->base_currency === 'USD') return '$' . number_format($this->original_price, 2);
        if ($this->base_currency === 'GBP') return '£' . number_format($this->original_price, 2);
        if ($this->base_currency === 'EUR') return number_format($this->original_price, 2) . '€';

        return '$' . number_format($this->original_price, 2);
    }
}
