<?php

namespace App\Models;

use chillerlan\QRCode\QRCode;
use Faker\Factory;
use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EventTicketPurchase extends Model
{
    use HasFactory,
    SoftDeletes,
    HasTimestamps;

    const PURCHASE_CURRENCY_SYMBOLS = [
        'USD' => '$',
        'GBP' => '£',
        'EUR' => '€',
    ];

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'purchase_price',
        'purchase_currency',

        'entry_barcode',
        'entry_code',

        'resold_at',
        'resold_by_id',
        'resold_as_id',

        'refunded_at',
        'refunded_by_id',
        'refunded_reason',

        'event_ticket_id',
        'event_id',
        'venue_id',
        'visitor_id',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'purchase_price' => 'float',
    ];

    /**
     * The attributes that should be appended.
     */
    protected $appends = [
        'formatted_purchase_price',
        'entry_barcode_qr_code',
    ];

    /**
     * Relationships which should be eager loaded by default.
     */
    protected $with = [
        'event',
        'eventTicket',
        'visitor',
    ];

    /**
     * Get the user that resold the ticket purchase.
     */
    public function resoldBy()
    {
        return $this->belongsTo(User::class, 'resold_by_id');
    }

    /**
     * Get the ticket purchase that the ticket purchase was resold as.
     */
    public function resoldAs()
    {
        return $this->belongsTo(EventTicketPurchase::class, 'resold_as_id');
    }

    /**
     * Get the user that refunded the ticket purchase.
     */
    public function refundedBy()
    {
        return $this->belongsTo(User::class, 'refunded_by_id');
    }

    /**
     * Get the event that owns the ticket purchase.
     */
    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    /**
     * Get the venue that owns the ticket purchase.
     */
    public function venue()
    {
        return $this->belongsTo(Venue::class);
    }

    /**
     * Get the ticket that owns the ticket purchase.
     */
    public function eventTicket()
    {
        return $this->belongsTo(EventTicket::class, 'event_ticket_id');
    }

    /**
     * Get the visitor that owns the ticket purchase.
     */
    public function visitor()
    {
        return $this->belongsTo(Visitor::class);
    }

    /**
     * Get the formatted purchase price.
     */
    public function getFormattedPurchasePriceAttribute()
    {
        if ($this->purchase_currency === 'USD') return '$' . number_format($this->purchase_price, 2);
        if ($this->purchase_currency === 'GBP') return '£' . number_format($this->purchase_price, 2);
        if ($this->purchase_currency === 'EUR') return number_format($this->purchase_price, 2) . '€';

        return '$' . number_format($this->purchase_price, 2);
    }

    /**
     * Get the entry barcode as a QR code.
     */
    public function getEntryBarcodeQrCodeAttribute()
    {
        return (new QRCode)->render($this->entry_barcode . '|' . $this->entry_code);
    }

    public static function generateEntryBarcode() {
        return Factory::create()->regexify('[0-9a-f]{30}');
    }

    public static function generateEntryCode() {
        return Factory::create()->randomNumber(6, true);
    }
}
