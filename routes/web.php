<?php

use App\Http\Controllers\SocialMediaVideoMakerAppController;
use App\Http\Controllers\VenueManagementAppController;
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
    Route::get('/apps/venue-management-app', [VenueManagementAppController::class, 'index'])->name('venue-management-app.index');

    Route::get('/apps/venue-management-app/events', [VenueManagementAppController::class, 'eventIndex'])->name('venue-management-app.events.index');
    Route::get('/apps/venue-management-app/events/{event}', [VenueManagementAppController::class, 'eventShow'])->name('venue-management-app.events.show');

    Route::get('/apps/venue-management-app/artists', [VenueManagementAppController::class, 'artistIndex'])->name('venue-management-app.artists.index');
    Route::get('/apps/venue-management-app/artists/{artist}', [VenueManagementAppController::class, 'artistShow'])->name('venue-management-app.artists.show');

    Route::get('/apps/venue-management-app/event-ticket-purchases', [VenueManagementAppController::class, 'eventTicketPurchaseIndex'])->name('venue-management-app.event-ticket-purchases.index');
    Route::get('/apps/venue-management-app/event-ticket-purchases/{eventTicketPurchase}', [VenueManagementAppController::class, 'eventTicketPurchaseShow'])->name('venue-management-app.event-ticket-purchases.show');

    Route::get('/apps/venue-management-app/venue-details', [VenueManagementAppController::class, 'venueDetails'])->name('venue-management-app.venue-details');
});

Route::get('/apps/social-media-video-maker', [SocialMediaVideoMakerAppController::class, 'index'])->name('social-media-video-maker.index');
Route::get('/why-hire-me', [WhyHireMeController::class, 'index'])->name('why-hire-me.index');

require __DIR__ . '/auth.php';
