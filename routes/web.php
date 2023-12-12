<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SocialMediaVideoMakerAppController;
use App\Http\Controllers\VenueManagementAppAppController;
use App\Http\Controllers\WhyHireMeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect()->route('login');
})->name('welcome');

Route::middleware('auth')->group(function () {
    Route::get('/apps/venue-management-app', [VenueManagementAppAppController::class, 'index'])->name('venue-management-app.index');
});

Route::get('/apps/social-media-video-maker', [SocialMediaVideoMakerAppController::class, 'index'])->name('social-media-video-maker.index');
Route::get('/why-hire-me', [WhyHireMeController::class, 'index'])->name('why-hire-me.index');

require __DIR__ . '/auth.php';
