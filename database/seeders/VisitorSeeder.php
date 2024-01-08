<?php

namespace Database\Seeders;

use App\Models\EventTicketPurchase;
use App\Models\VisitorActivityLog;
use App\Models\VisitorContactDetail;
use Carbon\Carbon;
use Faker\Factory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VisitorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Factory::create();

        $events = DB::table('events')->get();

        foreach ($events as $event) {
            // Make 3 event tickets for each event
            $price = rand(50, 100);

            $ticketIds = [];

            $ticketIds[] = DB::table('event_tickets')->insertGetId([
                'name' => 'General Admission',
                'current_price' => $price * ($faker->numberBetween(100, 300) / 100),
                'original_price' => $price,
                'base_currency' => 'GBP',
                'tickets_purchasable_at' => (new Carbon($event->starts_at))->subDays(rand(30, 120))->addHours(rand(1, 24))->addMinutes(rand(1, 60)),
                'tickets_purchased' => $faker->numberBetween(0, $event->tickets_purchased / 3),
                'tickets_available' => $event->tickets_available / 3,

                'event_id' => $event->id,
                'venue_id' => $event->venue_id,

                'created_at' => $event->created_at,
                'updated_at' => $event->updated_at,
            ]);

            $price = rand(100, 200);

            $ticketIds[] = DB::table('event_tickets')->insertGetId([
                'name' => 'Second Section',
                'current_price' => $price * ($faker->numberBetween(100, 300) / 100),
                'original_price' => $price,
                'base_currency' => 'GBP',

                'tickets_purchasable_at' => (new Carbon($event->starts_at))->subDays(rand(30, 120))->addHours(rand(1, 24))->addMinutes(rand(1, 60)),
                'tickets_purchased' => $faker->numberBetween(0, $event->tickets_purchased / 3),
                'tickets_available' => $event->tickets_available / 3,

                'event_id' => $event->id,
                'venue_id' => $event->venue_id,

                'created_at' => $event->created_at,
                'updated_at' => $event->updated_at,
            ]);

            $price = rand(200, 300);

            $ticketIds[] = DB::table('event_tickets')->insertGetId([
                'name' => 'Front Section',
                'current_price' => $price * ($faker->numberBetween(100, 300) / 100),
                'original_price' => $price,
                'base_currency' => 'GBP',

                'tickets_purchasable_at' => (new Carbon($event->starts_at))->subDays(rand(30, 120))->addHours(rand(1, 24))->addMinutes(rand(1, 60)),
                'tickets_purchased' => $faker->numberBetween(0, $event->tickets_purchased / 3),
                'tickets_available' => $event->tickets_available / 3,

                'event_id' => $event->id,
                'venue_id' => $event->venue_id,

                'created_at' => $event->created_at,
                'updated_at' => $event->updated_at,
            ]);

            // Make around 100 visitors for each event
            foreach (range(1, $faker->numberBetween(99, 123)) as $i) {
                $firstName = $faker->firstName();
                $lastName = $faker->lastName();

                $ticketPurchasedAt = (new Carbon($event->starts_at))->subDays(rand(1, 30))->addHours(rand(1, 24))->addMinutes(rand(1, 60));

                $visitorId = DB::table('visitors')->insertGetId([
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                    'full_name' => $firstName . ' ' . $lastName,

                    'venue_id' => $event->venue_id,

                    'created_at' => $ticketPurchasedAt,
                    'updated_at' => $ticketPurchasedAt,
                ]);

                $contactDetailIds = [
                    VisitorContactDetail::TYPE_NOTE => [],
                    VisitorContactDetail::TYPE_EMAIL => [],
                    VisitorContactDetail::TYPE_PHONE => [],
                    VisitorContactDetail::TYPE_ADDRESS => [],
                    VisitorContactDetail::TYPE_WEBSITE => [],
                    VisitorContactDetail::TYPE_PASSPORT => [],
                    VisitorContactDetail::TYPE_DRIVERS_LICENSE => [],
                    VisitorContactDetail::TYPE_NATIONAL_ID => [],
                    VisitorContactDetail::TYPE_LOYALTY_CARD => [],
                    VisitorContactDetail::TYPE_STUDENT_ID => [],
                    VisitorContactDetail::TYPE_EMPLOYEE_ID => [],
                    VisitorContactDetail::TYPE_ENROLLED_GROUP => [],
                    VisitorContactDetail::TYPE_WHATSAPP => [],
                    VisitorContactDetail::TYPE_FACEBOOK => [],
                    VisitorContactDetail::TYPE_TWITTER => [],
                    VisitorContactDetail::TYPE_INSTAGRAM => [],
                    VisitorContactDetail::TYPE_LINKEDIN => [],
                    VisitorContactDetail::TYPE_YOUTUBE => [],
                    VisitorContactDetail::TYPE_TIKTOK => [],
                    VisitorContactDetail::TYPE_SNAPCHAT => [],
                    VisitorContactDetail::TYPE_TELEGRAM => [],
                    VisitorContactDetail::TYPE_VIBER => [],
                    VisitorContactDetail::TYPE_DISCORD => [],
                ];

                $contactDetailIds[VisitorContactDetail::TYPE_EMAIL][] = DB::table('visitor_contact_details')->insertGetId([
                    'type' => VisitorContactDetail::TYPE_EMAIL,
                    'value' => $faker->email(),

                    'visitor_id' => $visitorId,
                    'venue_id' => $event->venue_id,

                    'created_at' => $ticketPurchasedAt,
                    'updated_at' => $ticketPurchasedAt,
                ]);

                $visitorTelephoneNumber = $faker->phoneNumber();

                $contactDetailIds[VisitorContactDetail::TYPE_PHONE][] = DB::table('visitor_contact_details')->insertGetId([
                    'type' => VisitorContactDetail::TYPE_PHONE,
                    'value' => $visitorTelephoneNumber,

                    'visitor_id' => $visitorId,
                    'venue_id' => $event->venue_id,

                    'created_at' => $ticketPurchasedAt,
                    'updated_at' => $ticketPurchasedAt,
                ]);

                $contactDetailIds[VisitorContactDetail::TYPE_ADDRESS][] = DB::table('visitor_contact_details')->insertGetId([
                    'type' => VisitorContactDetail::TYPE_ADDRESS,
                    'value' => $faker->address(),

                    'visitor_id' => $visitorId,
                    'venue_id' => $event->venue_id,

                    'created_at' => $ticketPurchasedAt,
                    'updated_at' => $ticketPurchasedAt,
                ]);

                if ($faker->boolean(15)) {
                    $contactDetailIds[VisitorContactDetail::TYPE_WEBSITE][] = DB::table('visitor_contact_details')->insertGetId([
                        'type' => VisitorContactDetail::TYPE_WEBSITE,
                        'value' => $faker->url(),

                        'visitor_id' => $visitorId,
                        'venue_id' => $event->venue_id,

                        'created_at' => $ticketPurchasedAt,
                        'updated_at' => $ticketPurchasedAt,
                    ]);
                }

                if ($faker->boolean(15)) {
                    $contactDetailIds[VisitorContactDetail::TYPE_PASSPORT][] = DB::table('visitor_contact_details')->insertGetId([
                        'type' => VisitorContactDetail::TYPE_PASSPORT,
                        'value' => $faker->regexify('[A-Z]{2}[0-9]{7}'),

                        'visitor_id' => $visitorId,
                        'venue_id' => $event->venue_id,

                        'created_at' => $ticketPurchasedAt,
                        'updated_at' => $ticketPurchasedAt,
                    ]);
                }

                if ($faker->boolean(15)) {
                    $contactDetailIds[VisitorContactDetail::TYPE_DRIVERS_LICENSE][] = DB::table('visitor_contact_details')->insertGetId([
                        'type' => VisitorContactDetail::TYPE_DRIVERS_LICENSE,
                        'value' => $faker->regexify('[A-Z]{2}[0-9]{7}'),

                        'visitor_id' => $visitorId,
                        'venue_id' => $event->venue_id,

                        'created_at' => $ticketPurchasedAt,
                        'updated_at' => $ticketPurchasedAt,
                    ]);
                }

                if ($faker->boolean(15)) {
                    $contactDetailIds[VisitorContactDetail::TYPE_NATIONAL_ID][] = DB::table('visitor_contact_details')->insertGetId([
                        'type' => VisitorContactDetail::TYPE_NATIONAL_ID,
                        'value' => $faker->regexify('[0-9]{7}[A-Z]{1}[0-9]{7}'),

                        'visitor_id' => $visitorId,
                        'venue_id' => $event->venue_id,

                        'created_at' => $ticketPurchasedAt,
                        'updated_at' => $ticketPurchasedAt,
                    ]);
                }

                if ($faker->boolean(30)) {
                    $contactDetailIds[VisitorContactDetail::TYPE_LOYALTY_CARD][] = DB::table('visitor_contact_details')->insertGetId([
                        'type' => VisitorContactDetail::TYPE_LOYALTY_CARD,
                        'value' => $faker->regexify('[0-9]{16}'),

                        'visitor_id' => $visitorId,
                        'venue_id' => $event->venue_id,

                        'created_at' => $ticketPurchasedAt,
                        'updated_at' => $ticketPurchasedAt,
                    ]);
                }

                if ($faker->boolean(30)) {
                    $contactDetailIds[VisitorContactDetail::TYPE_STUDENT_ID][] = DB::table('visitor_contact_details')->insertGetId([
                        'type' => VisitorContactDetail::TYPE_STUDENT_ID,
                        'value' => $faker->regexify('[0-9]{16}'),

                        'visitor_id' => $visitorId,
                        'venue_id' => $event->venue_id,

                        'created_at' => $ticketPurchasedAt,
                        'updated_at' => $ticketPurchasedAt,
                    ]);
                }

                if ($faker->boolean(10)) {
                    $contactDetailIds[VisitorContactDetail::TYPE_EMPLOYEE_ID][] = DB::table('visitor_contact_details')->insertGetId([
                        'type' => VisitorContactDetail::TYPE_EMPLOYEE_ID,
                        'value' => $faker->regexify('[0-9]{16}'),

                        'visitor_id' => $visitorId,
                        'venue_id' => $event->venue_id,

                        'created_at' => $ticketPurchasedAt,
                        'updated_at' => $ticketPurchasedAt,
                    ]);
                }

                if ($faker->boolean(80)) {
                    $contactDetailIds[VisitorContactDetail::TYPE_WHATSAPP][] = DB::table('visitor_contact_details')->insertGetId([
                        'type' => VisitorContactDetail::TYPE_WHATSAPP,
                        'value' => $visitorTelephoneNumber,

                        'visitor_id' => $visitorId,
                        'venue_id' => $event->venue_id,

                        'created_at' => $ticketPurchasedAt,
                        'updated_at' => $ticketPurchasedAt,
                    ]);
                }

                DB::table('visitor_activity_logs')->insert([
                    'type' => VisitorActivityLog::TYPE_VISITOR_CREATED,
                    'importance' => VisitorActivityLog::IMPORTANCE_INFO,
                    'message' => 'New Customer Created: ' . $firstName . ' ' . $lastName . '.',
                    'location' => $faker->randomElement([
                        VisitorActivityLog::LOCATION_WEBSITE,
                        VisitorActivityLog::LOCATION_MOBILE_APP,
                        VisitorActivityLog::LOCATION_IN_PERSON,
                        VisitorActivityLog::LOCATION_OVER_PHONE,
                        VisitorActivityLog::LOCATION_OVER_EMAIL,
                    ]),

                    'visitor_id' => $visitorId,
                    'event_id' => $event->id,
                    'venue_id' => $event->venue_id,

                    'created_at' => $ticketPurchasedAt,
                    'updated_at' => $ticketPurchasedAt,
                ]);

                $chosenTicketId = $faker->randomElement($ticketIds);
                $chosenTicket = DB::table('event_tickets')->where('id', $chosenTicketId)->first();

                $eventTicketPurchaseId = DB::table('event_ticket_purchases')->insertGetId([
                    'purchase_price' => $chosenTicket->current_price,
                    'purchase_currency' => $chosenTicket->base_currency,
                    'entry_barcode' => EventTicketPurchase::generateEntryBarcode(),
                    'entry_code' => EventTicketPurchase::generateEntryCode(),

                    'event_ticket_id' => $chosenTicketId,
                    'event_id' => $event->id,
                    'venue_id' => $event->venue_id,
                    'visitor_id' => $visitorId,

                    'created_at' => $ticketPurchasedAt,
                    'updated_at' => $ticketPurchasedAt,
                ]);

                DB::table('visitor_activity_logs')->insert([
                    'type' => VisitorActivityLog::TYPE_EVENT_TICKET_PURCHASE_CREATED,
                    'importance' => VisitorActivityLog::IMPORTANCE_INFO,
                    'message' => 'New Ticket Purchased: ' . $chosenTicket->name . ' by ' . $firstName . ' ' . $lastName . ' for ' . $event->name,
                    'location' => $faker->randomElement([
                        VisitorActivityLog::LOCATION_WEBSITE,
                        VisitorActivityLog::LOCATION_MOBILE_APP,
                        VisitorActivityLog::LOCATION_IN_PERSON,
                        VisitorActivityLog::LOCATION_OVER_PHONE,
                        VisitorActivityLog::LOCATION_OVER_EMAIL,
                    ]),

                    'visitor_id' => $visitorId,
                    'event_id' => $event->id,
                    'venue_id' => $event->venue_id,
                    'event_ticket_purchase_id' => $eventTicketPurchaseId,
                    'event_ticket_id' => $chosenTicket->id,

                    'created_at' => $ticketPurchasedAt,
                    'updated_at' => $ticketPurchasedAt,
                ]);
            }
        }
    }
}
