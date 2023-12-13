<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class ManagerUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $venue = DB::table('venues')->first();
        $emailServer = Str::slug($venue->name, '.') . '.' . Str::lower($venue->country);

        $firstName = fake()->firstName();
        $lastName = fake()->lastName();

        $email = Str::lower($firstName) . '.' . Str::lower($lastName) . '@' . $emailServer;

        DB::table('users')->insert([
            'name' => $firstName . ' ' . $lastName,
            'email' => $email,
            'password' => Hash::make('password'),
            'role' => User::ROLE_MANAGER,
        ]);
    }
}