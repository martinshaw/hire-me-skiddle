<?php

/**
 * All Rights Reserved, (c) 2024 CodeAtlas LTD.
 *
 * Author: Martin Shaw (developer@martinshaw.co)
 * File Name: VenueManagementAppVisitorController.php
 * Created:  2024-01-04T03:29:18.079Z
 * Modified: 2024-01-04T04:12:48.681Z
 *
 * Description: description
 */

namespace App\Http\Controllers\VenueManagementApp;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateContactDetailRequest;
use App\Http\Requests\DeleteContactDetailRequest;
use App\Http\Requests\UpdateContactDetailRequest;
use App\Models\Visitor;
use App\Models\VisitorContactDetail;

class VenueManagementAppVisitorController extends Controller
{
    public function createContactDetail(CreateContactDetailRequest $request, Visitor $visitor)
    {
        $visitor->contactDetails()->create($request->validated());

        return redirect()->back();
    }

    public function updateContactDetail(UpdateContactDetailRequest $request, Visitor $visitor, VisitorContactDetail $contactDetail)
    {
        $contactDetail->update($request->validated());

        return redirect()->back();
    }

    public function deleteContactDetail(DeleteContactDetailRequest $request, Visitor $visitor, VisitorContactDetail $contactDetail)
    {
        $contactDetail->delete();

        return redirect()->back();
    }
}
