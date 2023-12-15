<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class VisitorContactDetail extends Model
{
    use HasFactory,
    SoftDeletes,
    HasTimestamps;

    const TYPE_NOTE = 'note';
    const TYPE_EMAIL = 'email';
    const TYPE_PHONE = 'phone';
    const TYPE_ADDRESS = 'address';
    const TYPE_WEBSITE = 'website';
    const TYPE_PASSPORT = 'passport';
    const TYPE_DRIVERS_LICENSE = 'drivers_license';
    const TYPE_NATIONAL_ID = 'national_id';
    const TYPE_LOYALTY_CARD = 'loyalty_card';
    const TYPE_STUDENT_ID = 'student_id';
    const TYPE_EMPLOYEE_ID = 'employee_id';
    const TYPE_ENROLLED_GROUP = 'enrolled_group';
    const TYPE_WHATSAPP = 'whatsapp';
    const TYPE_FACEBOOK = 'facebook';
    const TYPE_TWITTER = 'twitter';
    const TYPE_INSTAGRAM = 'instagram';
    const TYPE_LINKEDIN = 'linkedin';
    const TYPE_YOUTUBE = 'youtube';
    const TYPE_TIKTOK = 'tiktok';
    const TYPE_SNAPCHAT = 'snapchat';
    const TYPE_TELEGRAM = 'telegram';
    const TYPE_VIBER = 'viber';
    const TYPE_DISCORD = 'discord';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'type',
        'value',

        'visitor_id',
        'venue_id',
    ];

    /**
     * Get the visitor that owns the contact detail.
     */
    public function visitor()
    {
        return $this->belongsTo(Visitor::class);
    }

    /**
     * Get the venue which the visitor belongs to.
     */
    public function venue()
    {
        return $this->belongsTo(Venue::class);
    }
}
