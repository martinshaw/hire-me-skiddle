<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(Request $request): Response
    {
        /**
         * I am passing the details of the seeded 'manager' user to the login view for visual demonstration.
         *
         * Of course, I would never do this in a production application.
         *
         * In a real application, I might use the wonderful Laravel Permissions package to manage roles and permissions.
         */
        $managerUser = User::managers()->first();

        return Inertia::render('Auth/Login/index', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
            'to' => $request->get('to'),
            'simulateFormInput' => $managerUser == null ?
                null :
                [
                    'email' => $managerUser->email,
                    'password' => 'password',
                ]
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(empty($request->get('to')) ? RouteServiceProvider::HOME : $request->get('to'));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
