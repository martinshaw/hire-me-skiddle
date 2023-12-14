<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Artist extends Model
{
    use HasFactory,
        HasTimestamps,
        SoftDeletes;

    public const CATEGORY_MUSICIAN = 'musician';
    public const CATEGORY_BAND = 'band';
    public const CATEGORY_DJ = 'dj';
    public const CATEGORY_COMEDIAN = 'comedian';
    public const CATEGORY_SPEAKER = 'speaker';
    public const CATEGORY_OTHER = 'other';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'description',
        'category',
        'born_at',
        'venue_id',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'born_at' => 'datetime',
    ];

    /**
     * The attributes that should be mutated to dates.
     */
    protected $dates = [
        'born_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     */
    protected $hidden = [
        'deleted_at',
    ];

    /**
     * Get all of the events for the artist.
     */
    public function events()
    {
        return $this->hasMany(Event::class);
    }

    /**
     * Get venue for the artist.
     */
    public function venue()
    {
        return $this->belongsTo(Venue::class);
    }

    /**
     * Virtual attribute for the artist's count of events
     */
    public function getEventsCountAttribute()
    {
        return cache()->remember(
            'artists:' . $this->id . ':events_count',
            60 * 60,
            fn () => $this->events()->count()
        );
    }
}
