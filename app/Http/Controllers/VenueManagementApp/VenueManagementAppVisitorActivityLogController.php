<?php
/**
 * All Rights Reserved, (c) 2024 CodeAtlas LTD.
 *
 * Author: Martin Shaw (developer@martinshaw.co)
 * File Name: VenueManagementAppActivityLogController.php
 * Created:  2024-01-05T04:36:41.531Z
 * Modified: 2024-01-08T14:40:54.904Z
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
            $perPage = 10;
            if ($request->has('perPage')) $perPage = (int) $request->get('perPage');

            $scopes = $request->get('scopes');

            $paginatedVisitorActivityLogs = VisitorActivityLog::query();

            if (empty($scopes['visitor']) === false) $paginatedVisitorActivityLogs->where('visitor_id', $scopes['visitor']);
            if (empty($scopes['event']) === false) $paginatedVisitorActivityLogs->where('event_id', $scopes['event']);
            if (empty($scopes['venue']) === false) $paginatedVisitorActivityLogs->where('venue_id', $scopes['venue']);
            if (empty($scopes['user']) === false) $paginatedVisitorActivityLogs->where('user_id', $scopes['user']);
            if (empty($scopes['eventTicketPurchase']) === false) $paginatedVisitorActivityLogs->where('event_ticket_purchase_id', $scopes['eventTicketPurchase']);
            if (empty($scopes['eventTicket']) === false) $paginatedVisitorActivityLogs->where('event_ticket_id', $scopes['eventTicket']);
            if (empty($scopes['visitorBan']) === false) $paginatedVisitorActivityLogs->where('visitor_ban_id', $scopes['visitorBan']);
            if (empty($scopes['visitorContactDetail']) === false) $paginatedVisitorActivityLogs->where('visitor_contact_detail_id', $scopes['visitorContactDetail']);

            return response()->json([
                'paginatedItems' => $paginatedVisitorActivityLogs->orderBy('created_at', 'desc')->paginate($perPage),
            ]);
        }

        return abort(404);
    }
}
