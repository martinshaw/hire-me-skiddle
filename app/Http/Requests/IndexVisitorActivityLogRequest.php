<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class IndexVisitorActivityLogRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $scopeIds = $this->get('scopes');
        if (is_array($scopeIds) === false) return false;

        $scopeVenueId = $scopeIds['venue'] ?? null;
        if (empty($scopeVenueId)) return false;
        if (is_numeric($scopeVenueId) === false) return false;

        return Auth::check() && Auth::user()->venue_id === (int) $scopeVenueId;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'page' => ['integer', 'min:1'],
            'scopes' => ['array'],
            'scopes.*' => ['string'],
        ];
    }
}
