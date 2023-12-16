<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class VisitorActivityLog extends Model
{
    use HasFactory,
    SoftDeletes,
    HasTimestamps;

    const TYPE_OTHER = 'other';
    const TYPE_VISITOR_CREATED = 'visitor_created';
    const TYPE_VISITOR_UPDATED = 'visitor_updated';
    const TYPE_VISITOR_DELETED = 'visitor_deleted';
    const TYPE_VISITOR_BANNED = 'visitor_banned';
    const TYPE_VISITOR_UNBANNED = 'visitor_unbanned';
    const TYPE_VISITOR_CONTACT_DETAIL_CREATED = 'visitor_contact_detail_created';
    const TYPE_VISITOR_CONTACT_DETAIL_UPDATED = 'visitor_contact_detail_updated';
    const TYPE_VISITOR_CONTACT_DETAIL_DELETED = 'visitor_contact_detail_deleted';
    const TYPE_EVENT_CREATED = 'event_created';
    const TYPE_EVENT_UPDATED = 'event_updated';
    const TYPE_EVENT_DELETED = 'event_deleted';
    const TYPE_EVENT_TICKET_CREATED = 'event_ticket_created';
    const TYPE_EVENT_TICKET_UPDATED = 'event_ticket_updated';
    const TYPE_EVENT_TICKET_DELETED = 'event_ticket_deleted';
    const TYPE_EVENT_TICKET_PURCHASE_CREATED = 'event_ticket_purchase_created';
    const TYPE_EVENT_TICKET_PURCHASE_UPDATED = 'event_ticket_purchase_updated';
    const TYPE_EVENT_TICKET_PURCHASE_DELETED = 'event_ticket_purchase_deleted';
    const TYPE_EVENT_TICKET_PURCHASE_CHECKED_IN = 'event_ticket_purchase_checked_in';
    const TYPE_EVENT_TICKET_PURCHASE_CHECKED_OUT = 'event_ticket_purchase_checked_out';
    const TYPE_EVENT_TICKET_PURCHASE_REFUNDED = 'event_ticket_purchase_refunded';
    const TYPE_EVENT_TICKET_PURCHASE_CANCELLED = 'event_ticket_purchase_cancelled';
    const TYPE_EVENT_TICKET_PURCHASE_UNCANCELLED = 'event_ticket_purchase_uncancelled';

    const IMPORTANCE_INFO = 'info';
    const IMPORTANCE_NEEDS_MANAGER_ATTENTION = 'needs_manager_attention';
    const IMPORTANCE_NEEDS_EMPLOYEE_ATTENTION = 'needs_employee_attention';
    const IMPORTANCE_NEEDS_AUDITOR_ATTENTION = 'needs_auditor_attention';
    const IMPORTANCE_NEEDS_SAFETY_OFFICER_ATTENTION = 'needs_safety_officer_attention';

    const LOCATION_WEBSITE = 'website';
    const LOCATION_MOBILE_APP = 'mobile_app';
    const LOCATION_IN_PERSON = 'in_person';
    const LOCATION_OVER_PHONE = 'over_phone';
    const LOCATION_OVER_EMAIL = 'over_email';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'type',
        'importance',
        'message',
        'location',

        'visitor_id',
        'event_id',
        'venue_id',
        'user_id',
        'event_ticket_purchase_id',
        'event_ticket_id',
        'visitor_ban_id',
        'visitor_contact_detail_id',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'type' => 'string',
        'importance' => 'string',
        'message' => 'string',
        'location' => 'string',
    ];

    /**
     * Get the visitor which the activity log is due to.
     */
    public function visitor()
    {
        return $this->belongsTo(Visitor::class);
    }

    /**
     * Get the event which the activity log is due to.
     */
    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    /**
     * Get the venue which the visitor belongs to.
     */
    public function venue()
    {
        return $this->belongsTo(Venue::class);
    }

    /**
     * Get the user which the activity log is due to.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the ticket purchase which the activity log is due to.
     */
    public function eventTicketPurchase()
    {
        return $this->belongsTo(EventTicketPurchase::class);
    }

    /**
     * Get the ticket which the activity log is due to.
     */
    public function eventTicket()
    {
        return $this->belongsTo(EventTicket::class);
    }

    /**
     * Get the ban which the activity log is due to.
     */
    public function visitorBan()
    {
        return $this->belongsTo(VisitorBan::class);
    }

    /**
     * Get the contact detail which the activity log is due to.
     */
    public function contactDetail()
    {
        return $this->belongsTo(VisitorContactDetail::class);
    }
}
