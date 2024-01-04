<?php

/**
 * All Rights Reserved, (c) 2023 CodeAtlas LTD.
 *
 * Author: Martin Shaw (developer@martinshaw.co)
 * File Name: VenueManagementAppController.php
 * Created:  2023-12-12T12:32:52.178Z
 * Modified: 2024-01-03T22:18:04.133Z
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
        $eventsQuery = $venue?->events();

        if (empty($request->get('event_name')) === false) {
            $eventsQuery->where('name', 'like', '%' . $request->get('event_name') . '%');
        }

        if (empty($request->get('artist_name')) === false) {
            $eventsQuery->whereHas('artist', function (Builder $query) use ($request) {
                $query->where('name', 'like', '%' . $request->get('artist_name') . '%');
            });
        }

        if (empty($request->get('tickets_purchased')) === false) {
            $countComparator = preg_replace('/[^<>=]/', '', $request->get('tickets_purchased'));
            $countNumeric = preg_replace('/[^0-9.]/', '', $request->get('tickets_purchased'));

            if (empty($countNumeric) === false) {
                if (is_numeric($countNumeric)) {
                    if ($countComparator === '=>') $countComparator = '>=';
                    if ($countComparator === '=<') $countComparator = '<=';
                    if (empty($countComparator)) $countComparator = '=';

                    $eventsQuery->where('tickets_purchased', $countComparator, $countNumeric);
                }
            }
        }

        if (empty($request->get('tickets_available')) === false) {
            $countComparator = preg_replace('/[^<>=]/', '', $request->get('tickets_available'));
            $countNumeric = preg_replace('/[^0-9.]/', '', $request->get('tickets_available'));

            if (empty($countNumeric) === false) {
                if (is_numeric($countNumeric)) {
                    if ($countComparator === '=>') $countComparator = '>=';
                    if ($countComparator === '=<') $countComparator = '<=';
                    if (empty($countComparator)) $countComparator = '=';

                    $eventsQuery->where('tickets_available', $countComparator, $countNumeric);
                }
            }
        }

        if (empty($request->get('starts_at')) === false) {
            $eventsQuery
                ->where('starts_at', '>=', $request->get('starts_at') . ' 00:00:00')
                ->where('starts_at', '<=', $request->get('starts_at') . ' 23:59:59');
        }

        if (empty($request->get('ends_at')) === false) {
            $eventsQuery
                ->where('ends_at', '>=', $request->get('ends_at') . ' 00:00:00')
                ->where('ends_at', '<=', $request->get('ends_at') . ' 23:59:59');
        }

        $perPage = $request->get('perPage', 10);
        $perPage = $perPage > 10 ? 10 : $perPage;

        return Inertia::render('Apps/VenueManagementApp/EventIndex/index', [
            'paginatedEvents' => fn () => $eventsQuery?->orderBy('created_at', 'desc')?->paginate($perPage),
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
        $artistsQuery = $venue?->artists();

        if (empty($request->get('artist_name')) === false) {
            $artistsQuery->where('name', 'like', '%' . $request->get('artist_name') . '%');
        }

        if (empty($request->get('artist_type')) === false) {
            $artistsQuery->where('category', 'like', '%' . $request->get('artist_type') . '%');
        }

        $perPage = $request->get('perPage', 10);
        $perPage = $perPage > 10 ? 10 : $perPage;

        return Inertia::render('Apps/VenueManagementApp/ArtistIndex/index', [
            'paginatedArtists' => fn () => $artistsQuery?->orderBy('created_at', 'desc')?->paginate($perPage),
        ]);
    }

    public function artistShow(Request $request, Artist $artist): Response
    {
        if ($artist->venue_id !== $request->user()->venue_id || $request->user()->venue === null) return abort(404);

        $eventsQuery = $artist?->events();

        if (empty($request->get('event_name')) === false) {
            $eventsQuery->where('name', 'like', '%' . $request->get('event_name') . '%');
        }

        if (empty($request->get('tickets_purchased')) === false) {
            $countComparator = preg_replace('/[^<>=]/', '', $request->get('tickets_purchased'));
            $countNumeric = preg_replace('/[^0-9.]/', '', $request->get('tickets_purchased'));

            if (empty($countNumeric) === false) {
                if (is_numeric($countNumeric)) {
                    if ($countComparator === '=>') $countComparator = '>=';
                    if ($countComparator === '=<') $countComparator = '<=';
                    if (empty($countComparator)) $countComparator = '=';

                    $eventsQuery->where('tickets_purchased', $countComparator, $countNumeric);
                }
            }
        }

        if (empty($request->get('tickets_available')) === false) {
            $countComparator = preg_replace('/[^<>=]/', '', $request->get('tickets_available'));
            $countNumeric = preg_replace('/[^0-9.]/', '', $request->get('tickets_available'));

            if (empty($countNumeric) === false) {
                if (is_numeric($countNumeric)) {
                    if ($countComparator === '=>') $countComparator = '>=';
                    if ($countComparator === '=<') $countComparator = '<=';
                    if (empty($countComparator)) $countComparator = '=';

                    $eventsQuery->where('tickets_available', $countComparator, $countNumeric);
                }
            }
        }

        if (empty($request->get('starts_at')) === false) {
            $eventsQuery
                ->where('starts_at', '>=', $request->get('starts_at') . ' 00:00:00')
                ->where('starts_at', '<=', $request->get('starts_at') . ' 23:59:59');
        }

        if (empty($request->get('ends_at')) === false) {
            $eventsQuery
                ->where('ends_at', '>=', $request->get('ends_at') . ' 00:00:00')
                ->where('ends_at', '<=', $request->get('ends_at') . ' 23:59:59');
        }

        $perPage = $request->get('perPage', 10);
        $perPage = $perPage > 10 ? 10 : $perPage;

        return Inertia::render('Apps/VenueManagementApp/ArtistShow/index', [
            'artist' => $artist,
            'paginatedEvents' => fn () => $eventsQuery?->orderBy('created_at', 'desc')?->paginate($perPage),
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
        $eventTicketsPurchaseQuery = $venue?->eventTicketPurchases();

        if (empty($request->get('purchase_id')) === false) {
            $eventTicketsPurchaseQuery->where('id', $request->get('purchase_id'));
        }

        if (empty($request->get('event')) === false) {
            $eventTicketsPurchaseQuery->whereHas('event', function (Builder $query) use ($request) {
                $query->where('name', 'like', '%' . $request->get('event') . '%');
            });
        }

        if (empty($request->get('artist')) === false) {
            $eventTicketsPurchaseQuery->whereHas('event.artist', function (Builder $query) use ($request) {
                $query->where('name', 'like', '%' . $request->get('artist') . '%');
            });
        }

        if (empty($request->get('visitor_name')) === false) {
            $eventTicketsPurchaseQuery->whereHas('visitor', function (Builder $query) use ($request) {
                $query->where('full_name', 'like', '%' . $request->get('visitor_name') . '%');
            });
        }

        if (empty($request->get('ticket_type')) === false) {
            $eventTicketsPurchaseQuery->whereHas('eventTicket', function (Builder $query) use ($request) {
                $query->where('name', 'like', '%' . $request->get('ticket_type') . '%');
            });
        }

        if (empty($request->get('price')) === false) {
            if ($request->get('price') === 'free') {
                $eventTicketsPurchaseQuery->where('purchase_price', 0);
            }

            $currencyCodes = array_keys(EventTicketPurchase::PURCHASE_CURRENCY_SYMBOLS);
            foreach ($currencyCodes as $currencyCode) {
                if (str_contains($request->get('price'), $currencyCode)) {
                    $eventTicketsPurchaseQuery->where('purchase_currency', $currencyCode);
                    break;
                }
            }

            $currencySymbols = array_values(EventTicketPurchase::PURCHASE_CURRENCY_SYMBOLS);
            foreach ($currencySymbols as $currencySymbol) {
                if (str_contains($request->get('price'), $currencySymbol)) {
                    $eventTicketsPurchaseQuery->where('purchase_currency', array_search($currencySymbol, EventTicketPurchase::PURCHASE_CURRENCY_SYMBOLS));
                    break;
                }
            }

            $priceComparator = preg_replace('/[^<>=]/', '', $request->get('price'));

            $priceNumeric = preg_replace('/[^0-9.,]/', '', $request->get('price'));
            $priceNumeric = str_replace(',', '.', $priceNumeric);

            if (empty($priceNumeric) === false) {
                if (is_numeric($priceNumeric)) {
                    if ($priceComparator === '=>') $priceComparator = '>=';
                    if ($priceComparator === '=<') $priceComparator = '<=';
                    if (empty($priceComparator)) $priceComparator = '=';

                    $eventTicketsPurchaseQuery->where('purchase_price', $priceComparator, $priceNumeric);
                }
            }
        }

        if (empty($request->get('purchase_date')) === false) {
            $eventTicketsPurchaseQuery
                ->where('created_at', '>=', $request->get('purchase_date') . ' 00:00:00')
                ->where('created_at', '<=', $request->get('purchase_date') . ' 23:59:59');
        }

        if (empty($request->get('event_date')) === false) {
            $eventTicketsPurchaseQuery->whereHas('event', function (Builder $query) use ($request) {
                $query
                    ->where('starts_at', '>=', $request->get('event_date') . ' 00:00:00')
                    ->where('starts_at', '<=', $request->get('event_date') . ' 23:59:59');
            });
        }

        $perPage = $request->get('perPage', 10);
        $perPage = $perPage > 10 ? 10 : $perPage;

        return Inertia::render('Apps/VenueManagementApp/EventTicketPurchaseIndex/index', [
            'paginatedEventTicketPurchases' => fn () => $eventTicketsPurchaseQuery?->orderBy('created_at', 'desc')?->paginate($perPage),
        ]);
    }

    public function eventTicketPurchaseShow(Request $request, EventTicketPurchase $eventTicketPurchase): Response
    {
        if ($eventTicketPurchase->venue_id !== $request->user()->venue_id || $request->user()->venue === null) return abort(404);

        $eventTicketPurchase = $eventTicketPurchase->load('visitor.contactDetails');

        return Inertia::render('Apps/VenueManagementApp/EventTicketPurchaseShow/index', [
            'eventTicketPurchase' => $eventTicketPurchase,
        ]);
    }
}
