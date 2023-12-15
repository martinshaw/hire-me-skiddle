<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class VisitorBan extends Model
{
    use HasFactory,
    SoftDeletes,
    HasTimestamps;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'reason',

        'visitor_id',
        'event_id',
        'user_id',
    ];

    /**
     * Get the event which the ban is due to.
     */
    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    /**
     * Get the user which the ban is due to.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the visitor which the ban is due to.
     */
    public function visitor()
    {
        return $this->belongsTo(Visitor::class);
    }
}
