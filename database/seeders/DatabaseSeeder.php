<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Enable maintenance mode
        Artisan::call('down');

        // Call seeders for demonstration
        $this->call([
            VenueSeeder::class,
            ManagerUserSeeder::class,
            ArtistSeeder::class,
            EventSeeder::class,
            VisitorSeeder::class,
        ]);

        // Flush any cached data
        cache()->flush();

        // Disable maintenance mode
        Artisan::call('up');
    }
}
