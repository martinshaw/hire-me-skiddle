<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Faker\Factory;

class ManagerUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $venue = DB::table('venues')->inRandomOrder()->first();

        $emailServer = Str::slug($venue->name, '-') . '.co.uk';

        $firstName = fake()->firstName();
        $lastName = fake()->lastName();

        $email = Str::lower($firstName) . '.' . Str::lower($lastName) . '@' . $emailServer;

        DB::table('users')->insert([
            'name' => $firstName . ' ' . $lastName,
            'email' => $email,
            'password' => Hash::make('password'),
            'role' => User::ROLE_MANAGER,

            'venue_id' => $venue->id,

            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
