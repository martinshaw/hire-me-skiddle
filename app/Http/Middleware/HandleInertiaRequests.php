<?php

namespace App\Http\Middleware;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $ongoingEvents = Event::ongoing()->get();

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'counts' => [
                'events' => empty($request->user()?->venue) ?
                    0 :
                    cache()->remember(
                        'venues:' . $request->user()->venue_id . ':events-count',
                        60,
                        fn () => ($request->user()?->venue?->events()?->count() ?? 0)
                    ),
                'artists' => empty($request->user()?->venue) ?
                    0 :
                    cache()->remember(
                        'venues:' . $request->user()->venue_id . ':artists-count',
                        60,
                        fn () => ($request->user()?->venue?->artists()?->count() ?? 0)
                    ),
            ],
            'navigation' => [
                'ongoing_events' => $ongoingEvents,
            ],
        ];
    }
}
