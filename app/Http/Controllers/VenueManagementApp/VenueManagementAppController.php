<?php

/**
 * All Rights Reserved, (c) 2023 CodeAtlas LTD.
 *
 * Author: Martin Shaw (developer@martinshaw.co)
 * File Name: VenueManagementAppController.php
 * Created:  2023-12-12T12:32:52.178Z
 * Modified: 2024-01-04T02:45:46.562Z
 *
 * Description: description
 */

namespace App\Http\Controllers\VenueManagementApp;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\RedirectResponse;

class VenueManagementAppController extends Controller
{
    public function index(): RedirectResponse
    {
        $ongoingEvent = Event::ongoing()->first();

        return empty($ongoingEvent) ?
            redirect()->route('venue-management-app.events.index') :
            redirect()->route('venue-management-app.events.show', $ongoingEvent->id);
    }
}
