<?php

namespace Database\Seeders;

use App\Models\VisitorActivityLog;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VisitorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $events = DB::table('events')->get();

        foreach ($events as $event) {
            // Make 3 event tickets for each event
            $price = rand(50, 100);

            $ticketIds = [];

            $ticketIds[] = DB::table('event_tickets')->insertGetId([
                'name' => 'General Admission',
                'current_price' => $price * (fake()->numberBetween(100, 300) / 100),
                'original_price' => $price,
                'base_currency' => 'USD',
                'tickets_purchasable_at' => (new Carbon($event->starts_at))->subDays(rand(30, 120))->addHours(rand(1, 24))->addMinutes(rand(1, 60)),
                'tickets_purchased' => fake()->numberBetween(0, $event->tickets_purchased / 3),
                'tickets_available' => $event->tickets_available / 3,

                'event_id' => $event->id,

                'created_at' => $event->created_at,
                'updated_at' => $event->updated_at,
            ]);

            $price = rand(100, 200);

            $ticketIds[] = DB::table('event_tickets')->insertGetId([
                'name' => 'Second Section',
                'current_price' => $price * (fake()->numberBetween(100, 300) / 100),
                'original_price' => $price,
                'base_currency' => 'USD',

                'tickets_purchasable_at' => (new Carbon($event->starts_at))->subDays(rand(30, 120))->addHours(rand(1, 24))->addMinutes(rand(1, 60)),
                'tickets_purchased' => fake()->numberBetween(0, $event->tickets_purchased / 3),
                'tickets_available' => $event->tickets_available / 3,

                'event_id' => $event->id,

                'created_at' => $event->created_at,
                'updated_at' => $event->updated_at,
            ]);

            $price = rand(200, 300);

            $ticketIds[] = DB::table('event_tickets')->insertGetId([
                'name' => 'Front Section',
                'current_price' => $price * (fake()->numberBetween(100, 300) / 100),
                'original_price' => $price,
                'base_currency' => 'USD',

                'tickets_purchasable_at' => (new Carbon($event->starts_at))->subDays(rand(30, 120))->addHours(rand(1, 24))->addMinutes(rand(1, 60)),
                'tickets_purchased' => fake()->numberBetween(0, $event->tickets_purchased / 3),
                'tickets_available' => $event->tickets_available / 3,

                'event_id' => $event->id,

                'created_at' => $event->created_at,
                'updated_at' => $event->updated_at,
            ]);

            // Make 100 visitors for each event
            foreach (range(1, 100) as $i) {
                $firstName = fake()->firstName();
                $lastName = fake()->lastName();

                $ticketPurchasedAt = (new Carbon($event->starts_at))->subDays(rand(1, 30))->addHours(rand(1, 24))->addMinutes(rand(1, 60));

                $visitorId = DB::table('visitors')->insertGetId([
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                    'created_at' => $ticketPurchasedAt,
                    'updated_at' => $ticketPurchasedAt,
                ]);

                DB::table('visitor_activity_logs')->insert([
                    'type' => VisitorActivityLog::TYPE_VISITOR_CREATED,
                    'importance' => VisitorActivityLog::IMPORTANCE_INFO,
                    'message' => 'New Customer Created: ' . $firstName . ' ' . $lastName . '.',
                    'location' => fake()->randomElement([
                        VisitorActivityLog::LOCATION_WEBSITE,
                        VisitorActivityLog::LOCATION_MOBILE_APP,
                        VisitorActivityLog::LOCATION_IN_PERSON,
                        VisitorActivityLog::LOCATION_OVER_PHONE,
                        VisitorActivityLog::LOCATION_OVER_EMAIL,
                    ]),
                    'visitor_id' => $visitorId,
                    'event_id' => $event->id,
                    'created_at' => $ticketPurchasedAt,
                    'updated_at' => $ticketPurchasedAt,
                ]);

                $chosenTicketId = fake()->randomElement($ticketIds);
                $chosenTicket = DB::table('event_tickets')->where('id', $chosenTicketId)->first();

                $entryBarcode = fake()->regexify('[0-9a-f]{30}');
                $entryCode = fake()->randomNumber(6, true);

                $eventTicketPurchaseId = DB::table('event_ticket_purchases')->insertGetId([
                    'purchase_price' => $chosenTicket->current_price,
                    'purchase_currency' => $chosenTicket->base_currency,
                    'entry_barcode' => $entryBarcode,
                    'entry_code' => $entryCode,
                    'event_ticket_id' => $chosenTicketId,
                    'event_id' => $event->id,
                    'visitor_id' => $visitorId,
                    'created_at' => $ticketPurchasedAt,
                    'updated_at' => $ticketPurchasedAt,
                ]);

                DB::table('visitor_activity_logs')->insert([
                    'type' => VisitorActivityLog::TYPE_EVENT_TICKET_PURCHASE_CREATED,
                    'importance' => VisitorActivityLog::IMPORTANCE_INFO,
                    'message' => 'New Ticket Purchased: ' . $chosenTicket->name . ' by ' . $firstName . ' ' . $lastName . ' for ' . $event->name,
                    'location' => fake()->randomElement([
                        VisitorActivityLog::LOCATION_WEBSITE,
                        VisitorActivityLog::LOCATION_MOBILE_APP,
                        VisitorActivityLog::LOCATION_IN_PERSON,
                        VisitorActivityLog::LOCATION_OVER_PHONE,
                        VisitorActivityLog::LOCATION_OVER_EMAIL,
                    ]),
                    'visitor_id' => $visitorId,
                    'event_id' => $event->id,
                    'event_ticket_purchase_id' => $eventTicketPurchaseId,
                    'event_ticket_id' => $chosenTicket->id,
                    'created_at' => $ticketPurchasedAt,
                    'updated_at' => $ticketPurchasedAt,
                ]);
            }
        }
    }
}
