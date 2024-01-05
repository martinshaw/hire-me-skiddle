<?php

namespace App\Http\Requests;

use App\Models\VisitorContactDetail;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateContactDetailRequest extends FormRequest
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

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'type' => ['required', 'string', Rule::in(VisitorContactDetail::TYPES)],
            'value' => ['required', 'string'],
        ];
    }
}
