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
        //
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
     * Get all of the users for the venue.
     */
    public function users()
    {
        return $this->hasMany(User::class);
    }

    /**
     * Get all of the visitors for the venue.
     */
    public function visitors()
    {
        return $this->hasMany(Visitor::class);
    }

    /**
     * Get all of the event tickets for the venue.
     */
    public function eventTickets()
    {
        return $this->hasMany(EventTicket::class);
    }

    /**
     * Get all of the event ticket purchases for the venue.
     */
    public function eventTicketPurchases()
    {
        return $this->hasMany(EventTicketPurchase::class);
    }

    /**
     * Get all of the visitor activity logs for the venue.
     */
    public function visitorActivityLogs()
    {
        return $this->hasMany(VisitorActivityLog::class);
    }
}
