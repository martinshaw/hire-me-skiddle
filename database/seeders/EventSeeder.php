<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $artists = DB::table('artists')->get();
        $artistForOngoingEvent = $artists->shift();
        $venueForOngoingEvent = DB::table('venues')->where('id', $artistForOngoingEvent->venue_id)->first();

        /**
         * For maximally immersive demonstration , I will ensure that there is at least one event running for the whole duration of
         * the demo (1 day), after which the database will be dumped and reseeded.
         */

        // Names and descriptions of real-world musical events. With edited descriptions to fit the demo.
        $realEventInformation = [
            [
                'name' => 'Fearless Tour',
                'description' => 'The Fearless Tour was the first headlining concert tour by American singer-songwriter Taylor Swift, launched in support of her second studio album, Fearless (2008). Big Machine Records announced the first 52-date North American leg in January 2009; before the tour began on April 23, 2009, in Evansville, U.S., Swift had headlined music festivals in North America. Kellie Pickler, Gloriana, and Justin Bieber are supporting acts.',
                'artist' => 'Taylor Swift',
            ],
            [
                'name' => 'Speak Now World Tour',
                'description' => 'While promoting Speak Now, Swift mentioned her excitement for her upcoming tour. She has stated that the tour was going to be "big" and "extensive". Billboard magazine, announced the second tour by Swift. It has followed her successful Fearless Tour, which is playing over 100 dates in five countries. The Speak Now World Tour marked Swift\'s first in multiple stadiums. Before it commenced, she performed "The Allure of Taylor Swift" show aboard the MV Allure of the Seas at the Allure of the Seas Aquatheater, as a part of Royal Caribbean Cruises in Cozumel, Mexico. Swift used Tom Petty\'s "American Girl" as her entrance song.',
                'artist' => 'Taylor Swift',
            ],
            [
                'name' => 'The Red Tour',
                'description' => 'Launched in support of Swift\'s fourth studio album, Red (2012), the tour begins in Omaha, Nebraska. The Red Tour is receiving positive reviews from music critics. As well as being Swift\'s most successful tour at the time, it received four award nominations, winning one.',
                'artist' => 'Taylor Swift',
            ],
            [
                'name' => 'The 1989 World Tour',
                'description' => 'The 1989 World Tour is the concert tour by American singer-songwriter Taylor Swift, in support of her fifth studio album, 1989 (2014). The tour is becoming Swift\'s highest grossing and most attended tour to date, mobilizing 2,278,647 fans and $250,733,097 in revenue.',
                'artist' => 'Taylor Swift',
            ],
            [
                'name' => 'Reputation Stadium Tour',
                'description' => 'Reflecting themes of Reputation the concept of the Reputation Stadium Tour incorporates Goth subculture, Broadway theatricality and snake motifs. It features a main stage with a wedge-shaped display resembling a skyscraper under construction, as well as two smaller B-stages. The tour received universal acclaim from contemporary critics and journalists, who commonly labeled it the best concert tour and Swift\'s best tour yet, praising her stage presence, wardrobe, and versatile performances. They described it as a "hyper-maximalist" tour with high-tech production value. The tour received several "Tour of the Year" accolades.',
                'artist' => 'Taylor Swift',
            ],
            [
                'name' => 'Eras Tour',
                'description' => 'The Eras Tour is the upcoming sixth concert tour by American singer-songwriter Taylor Swift, in support of her upcoming seventh studio album, Eras (2022). The tour is scheduled consisting of 55 shows.',
                'artist' => 'Taylor Swift',
            ],
            [
                'name' => 'The Subtract Tour',
                'description' => 'The Subtract Tour is the concert tour by English singer-songwriter Ed Sheeran, in support of his debut studio album, + (2011). The tour was named after the mathematical symbol for subtraction, and was accompanied by the release of five EPs, each titled Songs I Wrote with Amy, Songs I Wrote with Johnny, Songs I Wrote with Fiona, Songs I Wrote with Jake, and Songs I Wrote with Elsie. The tour is a commercial success, with all shows selling out, and grossing $8.8 million from 166 shows.',
                'artist' => 'Ed Sheeran',
            ],
            [
                'name' => 'The Mathematics Tour',
                'description' => 'The Mathematics Tour is the concert tour by English singer-songwriter Ed Sheeran, in support of his second studio album, * (2014). The tour began in Osaka, Japan, and continued through Europe, the Americas, Oceania and Asia. The tour grossed $179.7 million from 154 shows, selling over 2.3 million tickets.',
                'artist' => 'Ed Sheeran',
            ],
            [
                'name' => 'The Divide Tour',
                'description' => 'The Divide Tour is the third world concert tour by English singer-songwriter Ed Sheeran, in support of his third studio album, ÷ (2017). The tour began in Turin, Italy. The tour has broken several records in the United Kingdom, including the most shows played in stadium venues, selling over 1.1 million tickets in the country alone. The tour has also broken the record for the most tickets sold by an artist on a tour, with over 4.86 million tickets sold on the first leg alone. The tour has grossed $775.6 million from 255 shows, making it the highest-grossing tour of all time.',
                'artist' => 'Ed Sheeran',
            ],
            [
                'name' => 'The Multiply Tour',
                'description' => 'The Multiply Tour is the fourth world concert tour by English singer-songwriter Ed Sheeran, in support of his upcoming fourth studio album, = (2021).',
                'artist' => 'Ed Sheeran',
            ],
            [
                'name' => 'The Plus Tour',
                'description' => 'The Plus Tour is the fifth world concert tour by English singer-songwriter Ed Sheeran, in support of his upcoming fifth studio album, + (2022).',
                'artist' => 'Ed Sheeran',
            ],
            [
                'name' => 'Dangerously in Love Tour',
                'description' => 'The Dangerously In Love Tour is a solo concert tour by American recording artist Beyoncé. The tour is intended to showcase songs from Beyoncé\'s debut solo album, Dangerously in Love. However, the set list also contained a special segment of her show dedicated to her girl group Destiny\'s Child and songs from Beyoncé\'s 2003 film The Fighting Temptations ("Fever" and "Summertime"). The stage is simple and featured a large LED screen in the back that moved up and down throughout the entire show and displayed video images of Beyoncé and her dancers, as well as some images from her music videos and some prerecorded images with special effects.',
                'artist' => 'Beyoncé',
            ],
            [
                'name' => 'The Beyoncé Experience',
                'description' => 'The Beyoncé Experience is the third concert tour by American singer Beyoncé. It is staged in support of her second studio album, B\'Day (2006). The Beyoncé Experience consisted of 96 shows over five legs.',
                'artist' => 'Beyoncé',
            ],
            [
                'name' => 'I Am... World Tour',
                'description' => 'The set list for the concerts include songs from Knowles\' three studio albums as well as several covers of other artists and a Destiny\'s Child medley. The central theme of the tour is to showcase the difference between Knowles\' dual personality; her emotional side and her onstage persona, Sasha Fierce which was also demonstrated in the dual album I Am... Sasha Fierce. The show features two stages - the main one and a smaller B-stage where Knowles was transferred during the middle of the show. She is backed by an all-female band, female background dancers and a big LED screen. Thierry Mugler collaborated with Knowles on the costumes and had a creative advisor role further working on the choreography, lighting and production. Chris March made the costumes usable for stage and helped in their making. For the ballads, Knowles wore longer dresses while for the performances of the up-tempo songs, more make-up and more revealing outfits were worn. The fashion and Knowles\' look and figure received praise from critics. The show is directed and choreographed by Frank Gatson Jr.',
                'artist' => 'Beyoncé',
            ],
            [
                'name' => 'The Mrs. Carter Show World Tour',
                'description' => 'The tour features royal themes with the singer emulating different queens through her fashion for which she collaborated with numerous designers and fashion houses. The set list of the shows includes songs from all four studio albums of Beyoncé\'s solo career. After the release of her eponymous fifth studio album, the 2014 shows were changed to incorporate tracks from the album. The tour has been lauded by music critics who praised Beyoncé for her energetic performances, dancing and vocal abilities. The show is directed and choreographed by Frank Gatson Jr.',
                'artist' => 'Beyoncé',
            ],
            [
                'name' => 'Away from Home Tour',
                'description' => 'The tour marks Drake\'s first concert tour after signing with Young Money Entertainment, as well as his first tour where he serves as the headline act. The concert tour, which features k-os and Francis & The Lights as initial opening acts, is in support of Drake\'s debut studio album and extended play, Thank Me Later and So Far Gone, respectively. Most of the track-list from these projects were performed, such as singles "Best I Ever Had", "I\'m Goin\' In", "Successful" and concert closer "Over". Additional singles where Drake acts as a featured artist were also performed, including "I Invented Sex", "BedRock", and "Forever". Despite bookings for a European leg of the tour, it was ultimately scrapped in favor of domestic support of the projects.',
                'artist' => 'Drake',
            ],
            [
                'name' => 'Club Paradise Tour',
                'description' => 'The Club Paradise Tour is the second headlining tour by Canadian recording artist, Drake. The tour comes following the release of Drake\'s second studio album, Take Care. The tour name was inspired by the song "Club Paradise" off of his album. The tour was announced on January 22. The tour dates were announced on Drake\'s website. The tour features Kendrick Lamar, A$AP Rocky, 2 Chainz, and The Weeknd as supporting acts. The European leg of the tour was co-headlined by Drake and fellow rapper, J. Cole. The tour grossed $42,645,000 from 68 shows.',
                'artist' => 'Drake',
            ],
            [
                'name' => 'Would You Like a Tour?',
                'description' => 'The Would You Like a Tour? is the third headlining tour by Canadian rapper Drake. It began in Pittsburgh, and features Future, Miguel and PartyNextDoor as opening acts for the North American leg. The tour has grossed $46,400,000 from 66 shows.',
                'artist' => 'Drake',
            ],
            [
                'name' => 'The Boy Meets World Tour',
                'description' => 'The Boy Meets World Tour is the fifth headlining tour by Canadian recording artist Drake, to support his album Views (2016), and his playlist More Life (2017). The European leg began at the Ziggo Dome in Amsterdam and concluded at the same venue. The opening acts for the European leg were the Canadian R&B duo dvsn, along with Young Thug for the UK and Ireland concerts. An Australia and New Zealand leg began in Auckland, New Zealand and ended in Melbourne, Australia.',
                'artist' => 'Drake',
            ]
        ];

        // Get random event from array for artist
        $informationForOngoingEvent = $realEventInformation[array_rand($realEventInformation)];

        $startAt = now()->subMinutes(24);
        $endAt = now()->addHours(3.5)->subMinutes(24);

        // Create a event occurring presently for the artist
        DB::table('events')->insert([
            'name' => $informationForOngoingEvent['name'],
            'description' => $informationForOngoingEvent['description'],
            'starts_at' => $startAt,
            'ends_at' => $endAt,
            'artist_id' => $artistForOngoingEvent->id,
            'venue_id' => $artistForOngoingEvent->venue_id,
            'tickets_purchased' => $venueForOngoingEvent->typical_capacity * (rand(1, 7) / 10),
            'tickets_available' => $venueForOngoingEvent->typical_capacity,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // To ensure that all events are not created in the same time sequence, shuffle the array
        shuffle($realEventInformation);

        // Cache loaded artist models for performance after shuffling
        $artistModels = [];

        // Create events for remaining "real-world" events
        foreach ($realEventInformation as $event) {
            // Skip event if it is the same as the ongoing event
            if ($event['name'] === $informationForOngoingEvent['name'] && $event['artist'] === $artistForOngoingEvent->name) continue;

            if (!array_key_exists($event['artist'], $artistModels)) $artistModels[$event['artist']] = DB::table('artists')->where('name', $event['artist'])->first();
            $artist = $artistModels[$event['artist']];

            $startAt = $endAt->addHours(rand(1, 3));
            $endAt = $startAt->addHours(rand(1, 3))->addMinutes(rand(1, 59));

            DB::table('events')->insert([
                'name' => $event['name'],
                'description' => $event['description'],
                'starts_at' => $startAt,
                'ends_at' => $endAt,
                'artist_id' => $artist->id,
                'venue_id' => $artist->venue_id,
                'tickets_purchased' => $venueForOngoingEvent->typical_capacity * (rand(1, 7) / 10),
                'tickets_available' => $venueForOngoingEvent->typical_capacity,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
