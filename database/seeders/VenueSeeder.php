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
        $typicalCapacity = fake()->numberBetween(100, 1000);
        $maxCapacity = fake()->numberBetween($typicalCapacity, $typicalCapacity * 2);

        DB::table('venues')->insert([
            'name' => fake()->company(),
            'address_line_1' => fake()->streetAddress(),
            'address_line_2' => fake()->secondaryAddress(),
            'city' => fake()->city(),
            'postcode' => fake()->postcode(),
            'country' => fake()->countryCode(),
            'logo_url' => fake()->imageUrl(640, 480, 'business'),
            'typical_capacity' => $typicalCapacity,
            'max_capacity' => $maxCapacity,
        ]);
    }
}
