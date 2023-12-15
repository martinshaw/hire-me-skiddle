<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use HasFactory,
        HasTimestamps,
        SoftDeletes;

    public const CATEGORY_CONCERT = 'concert';
    public const CATEGORY_CONFERENCE = 'conference';
    public const CATEGORY_PARTY = 'party';
    public const CATEGORY_WEDDING = 'wedding';
    public const CATEGORY_CINEMA = 'cinema';
    public const CATEGORY_THEATRE = 'theatre';
    public const CATEGORY_OTHER = 'other';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'description',
        'starts_at',
        'ends_at',
        'category',

        'tickets_purchasable_at',
        'tickets_purchased',
        'tickets_available',

        'cancelled_at',
        'cancelled_by_id',
        'cancelled_reason',

        'postponed_at',
        'postponed_by_id',
        'postponed_reason',

        'artist_id',
        'venue_id',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
        'tickets_purchasable_at' => 'datetime',
        'cancelled_at' => 'datetime',
        'postponed_at' => 'datetime',
    ];

    /**
     * The attributes that should be mutated to dates.
     */
    protected $dates = [
        'starts_at',
        'ends_at',
        'tickets_purchasable_at',
        'cancelled_at',
        'postponed_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     */
    protected $hidden = [
        'deleted_at',
    ];

    /**
     * The relationships that should eager loaded by default.
     */
    protected $with = [
        'artist',
        'venue',
        'cancelledBy',
        'postponedBy',
    ];

    /**
     * Get the user who cancelled the event.
     */
    public function cancelledBy()
    {
        return $this->belongsTo(User::class, 'cancelled_by_id');
    }

    /**
     * Get the user who postponed the event.
     */
    public function postponedBy()
    {
        return $this->belongsTo(User::class, 'postponed_by_id');
    }

    /**
     * Get the artist that owns the event.
     */
    public function artist()
    {
        return $this->belongsTo(Artist::class);
    }

    /**
     * Get the venue that owns the event.
     */
    public function venue()
    {
        return $this->belongsTo(Venue::class);
    }

    /**
     * Get the tickets for the event.
     */
    public function tickets()
    {
        return $this->hasMany(EventTicket::class);
    }

    /**
     * Get the ticket purchases for the event.
     */
    public function ticketPurchases()
    {
        return $this->hasMany(EventTicketPurchase::class);
    }

    /**
     * Scope a query to only include events that are not cancelled, postponed or deleted.
     */
    public function scopeActive($query)
    {
        return $query->whereNull('cancelled_at')
            ->whereNull('postponed_at')
            ->whereNull('deleted_at')
            ->orderBy('starts_at', 'asc');
    }

    /**
     * Scope a query to only include events that are currently ongoing.
     */
    public function scopeOngoing($query)
    {
        $now = now();

        return $query->whereNull('cancelled_at')
            ->whereNull('postponed_at')
            ->whereNull('deleted_at')
            ->orderBy('starts_at', 'asc')
            ->where('starts_at', '<=', $now)
            ->where('ends_at', '>=', $now);
    }
}
