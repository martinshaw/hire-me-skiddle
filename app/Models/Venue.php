<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Venue extends Model
{
    use HasFactory, SoftDeletes, HasTimestamps;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'address_line_1',
        'address_line_2',
        'address_line_3',
        'city',
        'postcode',
        'country',
        'logo_url',
        'typical_capacity',
        'max_capacity',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        //
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Add virtual attributes to serialization.
     */
    protected $appends = [
        'events_count',
        'artists_count',
    ];

    /**
     * Get all of the events for the venue.
     */
    public function events()
    {
        return $this->hasMany(Event::class);
    }

    /**
     * Get all of the artists for the venue.
     */
    public function artists()
    {
        return $this->hasMany(Artist::class);
    }

    /**
     * Virtual attribute to get the venue's count of events.
     */
    public function getEventsCountAttribute()
    {
        return cache()->remember(
            'venues:' . $this->id . ':events_count',
            60 * 60,
            fn () => $this->events()->count()
        );
    }

    /**
     * Virtual attribute to get the venue's count of artists.
     */
    public function getArtistsCountAttribute()
    {
        return cache()->remember(
            'venues:' . $this->id . ':artists_count',
            60 * 60,
            fn () => $this->artists()->count()
        );
    }
}
