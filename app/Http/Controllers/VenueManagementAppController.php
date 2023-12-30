<?php

/**
 * All Rights Reserved, (c) 2023 CodeAtlas LTD.
 *
 * Author: Martin Shaw (developer@martinshaw.co)
 * File Name: VenueManagementAppController.php
 * Created:  2023-12-12T12:32:52.178Z
 * Modified: 2023-12-18T12:17:23.042Z
 *
 * Description: description
 */

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Artist;
use App\Models\Event;
use App\Models\EventTicketPurchase;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Builder;
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

        $event = $event->load('venue');

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

    public function eventTicketPurchaseIndex(Request $request): Response
    {
        $venue = $request?->user()?->venue;

        $perPage = $request->get('perPage', 10);
        $perPage = $perPage > 10 ? 10 : $perPage;

        $eventTicketsPurchaseQuery = $venue?->eventTicketPurchases();

        if ($request->has('event')) {
            $eventTicketsPurchaseQuery->whereHas('event', function (Builder $query) use ($request) {
                $query->where('name', 'like', '%' . $request->get('event') . '%');
            });
        }

        if ($request->has('artist')) {
            // $eventTicketsPurchaseQuery->whereHas('event.artist', function (Builder $query) use ($request) {
            //     $query->where('name', 'like', '%' . $request->get('artist') . '%');
            // });


            $eventTicketsPurchaseQuery->whereHas('event', function (Builder $query) use ($request) {
                $query->whereHas('artist', function (Builder $query) use ($request) {
                    $query->where('name', 'like', '%' . $request->get('artist') . '%');
                });
            });
        }

        if ($request->has('visitor_name')) {
            $eventTicketsPurchaseQuery->whereHas('visitor', function (Builder $query) use ($request) {
                $query->where('name', 'like', '%' . $request->get('visitor_name') . '%');
            });
        }

        if ($request->has('ticket_type')) {
            $eventTicketsPurchaseQuery->whereHas('eventTicket', function (Builder $query) use ($request) {
                $query->where('name', 'like', '%' . $request->get('ticket_type') . '%');
            });
        }

        if ($request->has('price')) {
            $eventTicketsPurchaseQuery->where('purchase_price', $request->get('price'));
        }

        if ($request->has('purchase_date')) {
            $eventTicketsPurchaseQuery->where('created_at', $request->get('purchase_date'));
        }

        if ($request->has('event_date')) {
            $eventTicketsPurchaseQuery->whereHas('event', function (Builder $query) use ($request) {
                $query->where('starts_at', $request->get('event_date'));
            });
        }

        $paginatedEventTicketPurchases = $eventTicketsPurchaseQuery?->orderBy('created_at', 'desc')?->paginate($perPage);

        return Inertia::render('Apps/VenueManagementApp/EventTicketPurchaseIndex/index', [
            'paginatedEventTicketPurchases' => $paginatedEventTicketPurchases,
        ]);
    }

    public function eventTicketPurchaseShow(Request $request, EventTicketPurchase $eventTicketPurchase): Response
    {
        if ($eventTicketPurchase->venue_id !== $request->user()->venue_id || $request->user()->venue === null) return abort(404);

        return Inertia::render('Apps/VenueManagementApp/EventTicketPurchaseShow/index', [
            'eventTicketPurchase' => $eventTicketPurchase,
        ]);
    }
}
