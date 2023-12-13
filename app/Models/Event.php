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
        'start_date',
        'end_date',
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
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'tickets_purchasable_at' => 'datetime',
        'cancelled_at' => 'datetime',
        'postponed_at' => 'datetime',
    ];

    /**
     * The attributes that should be mutated to dates.
     */
    protected $dates = [
        'start_date',
        'end_date',
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
}
