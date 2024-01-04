<?php

/**
 * All Rights Reserved, (c) 2024 CodeAtlas LTD.
 *
 * Author: Martin Shaw (developer@martinshaw.co)
 * File Name: VenueManagementAppEventController.php
 * Created:  2024-01-04T02:25:35.147Z
 * Modified: 2024-01-04T02:25:35.147Z
 *
 * Description: description
 */

namespace App\Http\Controllers\VenueManagementApp;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VenueManagementAppEventController extends Controller
{
    public function index(Request $request): Response
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

    public function show(Request $request, Event $event): Response
    {
        if ($event->venue_id !== $request->user()->venue_id || $request->user()->venue === null) return abort(404);

        $event = $event->load('venue');

        return Inertia::render('Apps/VenueManagementApp/EventShow/index', [
            'event' => $event,
        ]);
    }

}
