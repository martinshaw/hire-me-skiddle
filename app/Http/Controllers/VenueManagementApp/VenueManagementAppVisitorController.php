<?php

/**
 * All Rights Reserved, (c) 2024 CodeAtlas LTD.
 *
 * Author: Martin Shaw (developer@martinshaw.co)
 * File Name: VenueManagementAppVisitorController.php
 * Created:  2024-01-04T03:29:18.079Z
 * Modified: 2024-01-08T14:43:37.575Z
 *
 * Description: description
 */

namespace App\Http\Controllers\VenueManagementApp;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateContactDetailRequest;
use App\Http\Requests\DeleteContactDetailRequest;
use App\Http\Requests\UpdateContactDetailRequest;
use App\Models\Visitor;
use App\Models\VisitorActivityLog;
use App\Models\VisitorContactDetail;

class VenueManagementAppVisitorController extends Controller
{
    public function createContactDetail(CreateContactDetailRequest $request, Visitor $visitor)
    {
        $contactDetail = $visitor->contactDetails()->create(array_merge(
            $request->validated(),
            [
                'visitor_id' => $visitor->id,
                'venue_id' => $visitor->venue_id,
            ],
        ));

        VisitorActivityLog::create([
            'type' => VisitorActivityLog::TYPE_VISITOR_CONTACT_DETAIL_CREATED,
            'importance' => VisitorActivityLog::IMPORTANCE_INFO,
            'message' => 'Visitor contact detail created.',
            'location' => VisitorActivityLog::LOCATION_WEBSITE,

            'visitor_id' => $contactDetail->visitor_id,
            'venue_id' => $contactDetail->venue_id,
            'user_id' => Auth()->id(),
            'visitor_contact_detail_id' => $contactDetail->getOriginal('id'),
        ]);

        return redirect()->back();
    }

    public function updateContactDetail(UpdateContactDetailRequest $request, Visitor $visitor, VisitorContactDetail $contactDetail)
    {
        $contactDetail->update($request->validated());

        VisitorActivityLog::create([
            'type' => VisitorActivityLog::TYPE_VISITOR_CONTACT_DETAIL_UPDATED,
            'importance' => VisitorActivityLog::IMPORTANCE_INFO,
            'message' => 'Visitor contact detail updated, from ' . $contactDetail->getOriginal('value') . ' to ' . $contactDetail->value . '.',
            'location' => VisitorActivityLog::LOCATION_WEBSITE,

            'visitor_id' => $contactDetail->visitor_id,
            'venue_id' => $contactDetail->venue_id,
            'user_id' => Auth()->id(),
            'visitor_contact_detail_id' => $contactDetail->id,
        ]);

        return redirect()->back();
    }

    public function deleteContactDetail(DeleteContactDetailRequest $request, Visitor $visitor, VisitorContactDetail $contactDetail)
    {
        $contactDetail->delete();

        VisitorActivityLog::create([
            'type' => VisitorActivityLog::TYPE_VISITOR_CONTACT_DETAIL_DELETED,
            'importance' => VisitorActivityLog::IMPORTANCE_INFO,
            'message' => 'Visitor contact detail deleted.',
            'location' => VisitorActivityLog::LOCATION_WEBSITE,

            'visitor_id' => $contactDetail->visitor_id,
            'venue_id' => $contactDetail->venue_id,
            'user_id' => Auth()->id(),
            'visitor_contact_detail_id' => $contactDetail->getOriginal('id'),
        ]);

        return redirect()->back();
    }
}
