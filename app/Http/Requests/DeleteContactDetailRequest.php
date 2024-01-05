<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DeleteContactDetailRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        if ($this->route('visitor')->venue_id !== $this->user()->venue_id) return false;
        if ($this->route('contactDetail')->visitor_id !== $this->route('visitor')->id) return false;

        return true;
    }
}
