<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Visitor extends Model
{
    use HasFactory,
    SoftDeletes,
    HasTimestamps;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',

        'venue_id',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'first_name' => 'string',
        'middle_name' => 'string',
        'last_name' => 'string',
    ];

    /**
     * Relationships which should be eager loaded by default
     */
    protected $with = [
        'visitorBans',
    ];

    /**
     * The attributes that should be appended.
     */
    protected $appends = [
        'full_name',
    ];

    /**
     * Get the ticket purchases for the visitor.
     */
    public function eventTicketPurchases()
    {
        return $this->hasMany(EventTicketPurchase::class);
    }

    /**
     * Get the bans for the visitor.
     */
    public function visitorBans()
    {
        return $this->hasMany(VisitorBan::class);
    }

    /**
     * Get the contact details for the visitor.
     */
    public function contactDetails()
    {
        return $this->hasMany(VisitorContactDetail::class);
    }

    /**
     * Get the venue which the visitor belongs to.
     */
    public function venue()
    {
        return $this->belongsTo(Venue::class);
    }

    /**
     * Get the full name of the visitor.
     */
    public function getFullNameAttribute()
    {
        $name = $this->first_name;
        if (empty($this->middle_name) === false) $name .= ' ' . $this->middle_name;
        if (empty($this->last_name) === false) $name .= ' ' . $this->last_name;

        return $name;
    }
}
