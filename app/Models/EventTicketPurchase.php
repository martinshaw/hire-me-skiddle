<?php

namespace App\Models;

use chillerlan\QRCode\QRCode;
use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EventTicketPurchase extends Model
{
    use HasFactory,
    SoftDeletes,
    HasTimestamps;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'purchase_price',
        'purchase_currency',

        'entry_barcode',
        'entry_code',

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
    public function ticket()
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
}
