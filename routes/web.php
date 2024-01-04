<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WhyHireMeController;
use App\Http\Controllers\VenueManagementApp\VenueManagementAppController;
use App\Http\Controllers\VenueManagementApp\VenueManagementAppEventController;
use App\Http\Controllers\VenueManagementApp\VenueManagementAppArtistController;
use App\Http\Controllers\VenueManagementApp\VenueManagementAppEventTicketPurchaseController;
use App\Http\Controllers\SocialMediaVideoMakerAppController;

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

Route::get('/', fn() => redirect()->route('why-hire-me.index'))->name('welcome');

Route::get('/why-hire-me', [WhyHireMeController::class, 'index'])->name('why-hire-me.index');

Route::middleware('auth')->group(function () {
    Route::get('/apps/venue-management-app', [VenueManagementAppController::class, 'index'])->name('venue-management-app.index');

    Route::get('/apps/venue-management-app/events', [VenueManagementAppEventController::class, 'index'])->name('venue-management-app.events.index');
    Route::get('/apps/venue-management-app/events/{event}', [VenueManagementAppEventController::class, 'show'])->name('venue-management-app.events.show');

    Route::get('/apps/venue-management-app/artists', [VenueManagementAppArtistController::class, 'index'])->name('venue-management-app.artists.index');
    Route::get('/apps/venue-management-app/artists/{artist}', [VenueManagementAppArtistController::class, 'show'])->name('venue-management-app.artists.show');

    Route::get('/apps/venue-management-app/event-ticket-purchases', [VenueManagementAppEventTicketPurchaseController::class, 'index'])->name('venue-management-app.event-ticket-purchases.index');
    Route::post('/apps/venue-management-app/event-ticket-purchases/{eventTicketPurchase}/refund', [VenueManagementAppEventTicketPurchaseController::class, 'refund'])->name('venue-management-app.event-ticket-purchases.refund');
    Route::get('/apps/venue-management-app/event-ticket-purchases/{eventTicketPurchase}', [VenueManagementAppEventTicketPurchaseController::class, 'show'])->name('venue-management-app.event-ticket-purchases.show');
});

Route::get('/apps/social-media-video-maker', [SocialMediaVideoMakerAppController::class, 'index'])->name('social-media-video-maker.index');

require __DIR__ . '/auth.php';
