<?php
/**
 * All Rights Reserved, (c) 2024 CodeAtlas LTD.
 *
 * Author: Martin Shaw (developer@martinshaw.co)
 * File Name: VenueManagementAppActivityLogController.php
 * Created:  2024-01-05T04:36:41.531Z
 * Modified: 2024-01-08T18:02:45.250Z
 *
 * Description: description
 */

namespace App\Http\Controllers\VenueManagementApp;

use App\Http\Controllers\Controller;
use App\Http\Requests\IndexVisitorActivityLogRequest;
use App\Models\VisitorActivityLog;
use Illuminate\Http\Request;

class VenueManagementAppVisitorActivityLogController extends Controller
{
    public function index(IndexVisitorActivityLogRequest $request)
    {
        if ($request->ajax()) {
            $perPage = 25;
            if ($request->has('perPage')) $perPage = (int) $request->get('perPage');

            $scopes = $request->get('scopes');

            $paginatedVisitorActivityLogs = VisitorActivityLog::query();

            if (empty($scopes['visitor']) === false)
                $paginatedVisitorActivityLogs->where(
                    fn ($query) => $query
                        ->where('visitor_id', $scopes['visitor'])
                        ->orWhere('visitor_id', null)
                );

            if (empty($scopes['event']) === false)
                $paginatedVisitorActivityLogs->where(
                    fn ($query) => $query
                        ->where('event_id', $scopes['event'])
                        ->orWhere('event_id', null)
                );

            if (empty($scopes['venue']) === false)
                $paginatedVisitorActivityLogs->where(
                    fn ($query) => $query
                        ->where('venue_id', $scopes['venue'])
                        ->orWhere('venue_id', null)
                );

            if (empty($scopes['user']) === false)
                $paginatedVisitorActivityLogs->where(
                    fn ($query) => $query
                        ->where('user_id', $scopes['user'])
                        ->orWhere('user_id', null)
                );

            if (empty($scopes['eventTicketPurchase']) === false)
                $paginatedVisitorActivityLogs->where(
                    fn ($query) => $query
                        ->where('event_ticket_purchase_id', $scopes['eventTicketPurchase'])
                        ->orWhere('event_ticket_purchase_id', null)
                );

            if (empty($scopes['eventTicket']) === false)
                $paginatedVisitorActivityLogs->where(
                    fn ($query) => $query
                        ->where('event_ticket_id', $scopes['eventTicket'])
                        ->orWhere('event_ticket_id', null)
                );

            if (empty($scopes['visitorBan']) === false)
                $paginatedVisitorActivityLogs->where(
                    fn ($query) => $query
                        ->where('visitor_ban_id', $scopes['visitorBan'])
                        ->orWhere('visitor_ban_id', null)
                );

            if (empty($scopes['visitorContactDetail']) === false)
                $paginatedVisitorActivityLogs->where(
                    fn ($query) => $query
                        ->where('visitor_contact_detail_id', $scopes['visitorContactDetail'])
                        ->orWhere('visitor_contact_detail_id', null)
                );

            return response()->json([
                'paginatedItems' => $paginatedVisitorActivityLogs->orderBy('created_at', 'desc')->paginate($perPage),
            ]);
        }

        return abort(404);
    }
}
