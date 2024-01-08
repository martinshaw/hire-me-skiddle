<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes, HasTimestamps;

    const ROLE_MANAGER = 'manager';
    const ROLE_EMPLOYEE = 'employee';
    const ROLE_AUDITOR = 'auditor';
    const ROLE_SAFETY_OFFICER = 'safety_officer';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',

        'venue_id',
    ];

    /**
     * Relationships eager loaded by default.
     */
    protected $with = [
        'venue',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Scope a query to only include managers.
     */
    public function scopeManagers(Builder $query): void
    {
        $query->where('role', self::ROLE_MANAGER);
    }

    /**
     * Scope a query to only include employees.
     */
    public function scopeEmployees(Builder $query): void
    {
        $query->where('role', self::ROLE_EMPLOYEE);
    }

    /**
     * Scope a query to only include auditors.
     */
    public function scopeAuditors(Builder $query): void
    {
        $query->where('role', self::ROLE_AUDITOR);
    }

    /**
     * Scope a query to only include safety officers.
     */
    public function scopeSafetyOfficers(Builder $query): void
    {
        $query->where('role', self::ROLE_SAFETY_OFFICER);
    }

    /**
     * Get User's Venue.
     */
    public function venue()
    {
        return $this->belongsTo(Venue::class);
    }
}
