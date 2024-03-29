<?php

/**
 * All Rights Reserved, (c) 2023 CodeAtlas LTD.
 *
 * Author: Martin Shaw (developer@martinshaw.co)
 * File Name: VenueManagementAppEventTicketPurchaseController.php
 * Created:  2023-12-12T12:32:52.178Z
 * Modified: 2024-01-08T14:53:46.348Z
 *
 * Description: description
 */

namespace App\Http\Controllers\VenueManagementApp;

use App\Http\Controllers\Controller;
use App\Models\EventTicketPurchase;
use App\Models\VisitorActivityLog;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VenueManagementAppEventTicketPurchaseController extends Controller
{
    public function index(Request $request): Response
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

    public function show(Request $request, EventTicketPurchase $eventTicketPurchase): Response
    {
        if ($eventTicketPurchase->venue_id !== $request->user()->venue_id || $request->user()->venue === null) return abort(404);

        $eventTicketPurchase = $eventTicketPurchase->load('visitor.contactDetails');

        return Inertia::render('Apps/VenueManagementApp/EventTicketPurchaseShow/index', [
            'eventTicketPurchase' => $eventTicketPurchase,
        ]);
    }

    public function refund(EventTicketPurchase $eventTicketPurchase): RedirectResponse
    {
        $eventTicketPurchase->update([
            'refunded_at' => now(),
            'refunded_by_id' => auth()->id(),
        ]);

        VisitorActivityLog::create([
            'type' => VisitorActivityLog::TYPE_EVENT_TICKET_PURCHASE_REFUNDED,
            'importance' => VisitorActivityLog::IMPORTANCE_INFO,
            'message' => 'Ticket Refunded.',
            'location' => VisitorActivityLog::LOCATION_WEBSITE,

            'visitor_id' => $eventTicketPurchase->visitor_id,
            'event_id' => $eventTicketPurchase->event_id,
            'venue_id' => $eventTicketPurchase->venue_id,
            'user_id' => Auth()->id(),
            'event_ticket_purchase_id' => $eventTicketPurchase->id,
            'event_ticket_id' => $eventTicketPurchase->event_ticket_id,
        ]);

        return redirect()->back();
    }

    public function regenerateEntryCode(EventTicketPurchase $eventTicketPurchase): RedirectResponse
    {
        $currentEntryCode = $eventTicketPurchase->entry_code;

        $eventTicketPurchase->update([
            'entry_barcode' => EventTicketPurchase::generateEntryBarcode(),
            'entry_code' => EventTicketPurchase::generateEntryCode(),
        ]);

        VisitorActivityLog::create([
            'type' => VisitorActivityLog::TYPE_EVENT_TICKET_PURCHASE_REGENERATED_ENTRY_CODE,
            'importance' => VisitorActivityLog::IMPORTANCE_INFO,
            'message' => 'Regenerated Entry Code from ' . $currentEntryCode . ' to ' . $eventTicketPurchase->entry_code . '.',
            'location' => VisitorActivityLog::LOCATION_WEBSITE,

            'visitor_id' => $eventTicketPurchase->visitor_id,
            'event_id' => $eventTicketPurchase->event_id,
            'venue_id' => $eventTicketPurchase->venue_id,
            'user_id' => Auth()->id(),
            'event_ticket_purchase_id' => $eventTicketPurchase->id,
            'event_ticket_id' => $eventTicketPurchase->event_ticket_id,
        ]);

        return redirect()->back();
    }
}
