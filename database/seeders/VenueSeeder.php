<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class VenueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $realVenues = [
            [
                "name" => "AO Arena, Manchester",
                "address_line_1" => "Victoria Station",
                "city" => "Manchester",
                "postcode" => "M3 1AR",
                "max_capacity" => 21000
            ],
            [
                "name" => "The O2 Arena, London",
                "address_line_1" => "Peninsula Square",
                "city" => "London",
                "postcode" => "SE10 0DX",
                "max_capacity" => 20000
            ],
            [
                "name" => "Utilita Arena Birmingham",
                "address_line_1" => "King Edwards Road",
                "city" => "Birmingham",
                "postcode" => "B1 2AA",
                "max_capacity" => 16000
            ],
            [
                "name" => "P&J Live, Aberdeen",
                "address_line_1" => "East Burn Road",
                "city" => "Aberdeen",
                "postcode" => "AB21 9FX",
                "max_capacity" => 16000
            ],
            [
                "name" => "Resorts World Arena, Birmingham",
                "address_line_1" => "Perimeter Road",
                "city" => "Birmingham",
                "postcode" => "B40 1NT",
                "max_capacity" => 15643
            ],
            [
                "name" => "First Direct Arena, Leeds",
                "address_line_1" => "Arena Way",
                "city" => "Leeds",
                "postcode" => "LS2 8BY",
                "max_capacity" => 13500
            ],
            [
                "name" => "Utilita Arena Sheffield",
                "address_line_1" => "Broughton Lane",
                "city" => "Sheffield",
                "postcode" => "S9 2DF",
                "max_capacity" => 13500
            ],
            [
                "name" => "OVO Hydro, Glasgow",
                "address_line_1" => "Exhibition Way",
                "city" => "Glasgow",
                "postcode" => "G3 8YW",
                "max_capacity" => 13000
            ],
            [
                "name" => "OVO Arena Wembley, London",
                "address_line_1" => "Arena Square",
                "city" => "London",
                "postcode" => "HA9 0AA",
                "max_capacity" => 12500
            ],
            [
                "name" => "SEC Centre, Glasgow",
                "address_line_1" => "Exhibition Way",
                "city" => "Glasgow",
                "postcode" => "G3 8YW",
                "max_capacity" => 12500
            ],
            [
                "name" => "Utilita Arena Newcastle",
                "address_line_1" => "Arena Way",
                "city" => "Newcastle upon Tyne",
                "postcode" => "NE4 7NA",
                "max_capacity" => 11000
            ],
            [
                "name" => "M&S Bank Arena Liverpool",
                "address_line_1" => "Kings Dock",
                "address_line_2" => "Port of Liverpool",
                "city" => "Liverpool",
                "postcode" => "L3 4FP",
                "max_capacity" => 11000
            ],
            [
                "name" => "Motorpoint Arena Nottingham",
                "address_line_1" => "Bolero Square",
                "city" => "Nottingham",
                "postcode" => "NG1 1LA",
                "max_capacity" => 10000
            ],
            [
                "name" => "Copper Box Arena, London",
                "address_line_1" => "Queen Elizabeth Olympic Park",
                "city" => "London",
                "postcode" => "E20 3HB",
                "max_capacity" => 7500
            ],
            [
                "name" => "Cardiff International Arena",
                "address_line_1" => "Mary Ann Street",
                "city" => "Cardiff",
                "postcode" => "CF10 2EQ",
                "max_capacity" => 7500
            ],
            [
                "name" => "Lee Valley VeloPark, London",
                "address_line_1" => "Abercrombie Road",
                "address_line_2" => "Queen Elizabeth Olympic Park",
                "city" => "London",
                "postcode" => "E20 3AB",
                "max_capacity" => 7000
            ],
        ];

        $realVenue = $realVenues[array_rand($realVenues)];

        DB::table('venues')->insert(array_merge($realVenue, [
            "country" => "GB",
            'logo_url' => null,
            'typical_capacity' => $realVenue['max_capacity'] * 0.9,
            'created_at' => now(),
            'updated_at' => now(),
        ]));
    }
}
