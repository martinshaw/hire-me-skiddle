<?php

namespace Database\Seeders;

use App\Models\Artist;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ArtistSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $realArtists = [
            [
                'name' => 'Taylor Swift',
                'description' => 'Taylor Alison Swift is an American singer-songwriter. Her narrative songwriting, which often centers around her personal life, has received widespread critical plaudits and media coverage.',
                'category' => Artist::CATEGORY_MUSICIAN,
                'born_at' => '1989-12-13 00:00:00',
            ],
            [
                'name' => 'Ed Sheeran',
                'description' => 'Edward Christopher Sheeran MBE is an English singer, songwriter, musician, record producer, and actor. In early 2011, Sheeran independently released the extended play, No. 5 Collaborations Project.',
                'category' => Artist::CATEGORY_MUSICIAN,
                'born_at' => '1991-02-17 00:00:00',
            ],
            [
                'name' => 'Beyoncé',
                'description' => 'Beyoncé Giselle Knowles-Carter is an American singer, songwriter, actress, and record producer. Born and raised in Houston, Texas, Beyoncé performed in various singing and dancing competitions as a child.',
                'category' => Artist::CATEGORY_MUSICIAN,
                'born_at' => '1981-09-04 00:00:00',
            ],
            [
                'name' => 'Drake',
                'description' => 'Aubrey Drake Graham is a Canadian rapper, singer, songwriter, actor, and entrepreneur. A prominent figure in popular music, Drake is credited for popularizing the Toronto sound.',
                'category' => Artist::CATEGORY_MUSICIAN,
                'born_at' => '1986-10-24 00:00:00',
            ],
            [
                'name' => 'Ariana Grande',
                'description' => 'Ariana Grande-Butera is an American singer, songwriter, and actress. Born in Boca Raton, Florida, Grande began her career at age 15 in the 2008 Broadway musical 13.',
                'category' => Artist::CATEGORY_MUSICIAN,
                'born_at' => '1993-06-26 00:00:00',
            ],
            [
                'name' => 'Rihanna',
                'description' => 'Robyn Rihanna Fenty is a Barbadian singer, actress, and businesswoman. Born in Saint Michael and raised in Bridgetown, Barbados, Rihanna was discovered by American record producer Evan Rogers who invited her to the United States to record demo tapes.',
                'category' => Artist::CATEGORY_MUSICIAN,
                'born_at' => '1988-02-20 00:00:00',
            ],
            [
                'name' => 'The Weeknd',
                'description' => 'Abel Makkonen Tesfaye, known professionally as the Weeknd, is a Canadian singer, songwriter, and record producer. Noted for his versatility in vocal style, music production, and eccentric presentation, the Weeknd is often cited as an influence to contemporary music, as well as by other artists.',
                'category' => Artist::CATEGORY_MUSICIAN,
                'born_at' => '1990-02-16 00:00:00',
            ],
        ];

        $venues = DB::table('venues')->get();
        foreach ($venues as $venue) {
            foreach ($realArtists as $realArtist) {
                DB::table('artists')->insert(array_merge($realArtist, [
                    'venue_id' => $venue->id,
                ]));
            }
        }
    }
}
