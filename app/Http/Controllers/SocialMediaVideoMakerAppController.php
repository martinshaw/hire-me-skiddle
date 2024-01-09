<?php

/**
 * All Rights Reserved, (c) 2023 CodeAtlas LTD.
 *
 * Author: Martin Shaw (developer@martinshaw.co)
 * File Name: SocialMediaVideoMakerAppController.php
 * Created:  2023-12-12T12:33:03.798Z
 * Modified: 2024-01-09T07:40:20.655Z
 *
 * Description: description
 */

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class SocialMediaVideoMakerAppController extends Controller
{
    public function index(Request $request) //: Response
    {
        return response()->json([
            'message' => 'Hello World!'
        ]);
    }
}
