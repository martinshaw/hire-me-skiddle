<?php

/**
 * All Rights Reserved, (c) 2023 CodeAtlas LTD.
 *
 * Author: Martin Shaw (developer@martinshaw.co)
 * File Name: VenueManagementAppController.php
 * Created:  2023-12-12T12:32:52.178Z
 * Modified: 2023-12-14T17:31:11.566Z
 *
 * Description: description
 */

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Artist;
use App\Models\Event;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class VenueManagementAppController extends Controller
{
    public function index(Request $request): RedirectResponse
    {
        return redirect()->route('venue-management-app.events.index');
    }

    public function eventIndex(Request $request): Response
    {
        $venue = $request?->user()?->venue;
        $events = $venue?->events()?->get() ?? [];

        return Inertia::render('Apps/VenueManagementApp/EventIndex/index', [
            'events' => $events,
        ]);
    }

    public function eventShow(Request $request, Event $event): Response
    {
        if ($event->venue_id !== $request->user()->venue_id || $request->user()->venue === null) return abort(404);

        return Inertia::render('Apps/VenueManagementApp/EventShow/index', [
            'event' => $event,
        ]);
    }

    public function artistIndex(Request $request): Response
    {
        $venue = $request?->user()?->venue;
        $artists = $venue?->artists()?->get() ?? [];

        return Inertia::render('Apps/VenueManagementApp/ArtistIndex/index', [
            'artists' => $artists,
        ]);
    }

    public function artistShow(Request $request, Artist $artist): Response
    {
        $artist = $artist->load('events');

        if ($artist->venue_id !== $request->user()->venue_id || $request->user()->venue === null) return abort(404);

        return Inertia::render('Apps/VenueManagementApp/ArtistShow/index', [
            'artist' => $artist,
        ]);
    }

    public function venueDetails(Request $request): Response
    {
        $user = Auth::user();

        if ($user->venue == null) {
            return redirect()
                ->route('venue-management-app.index')
                ->withErrors('Your Skiddle account is not associated with a venue. Contact Skiddle and we can fix this.');
        }

        return Inertia::render('Apps/VenueManagementApp/VenueShow/index', [
            'venue' => $user->venue,
        ]);
    }
}
