<?php

/**
 * All Rights Reserved, (c) 2023 CodeAtlas LTD.
 *
 * Author: Martin Shaw (developer@martinshaw.co)
 * File Name: WhyHireMeController.php
 * Created:  2023-12-12T12:33:03.798Z
 * Modified: 2023-12-12T13:25:44.951Z
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

class WhyHireMeController extends Controller
{
    public function index(Request $request) //: Response
    {
        return response()->json([
            'message' => 'Hello World!'
        ]);
    }
}
