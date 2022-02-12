<?php

namespace Database\Seeders;

use App\Models\Detail;
use Illuminate\Database\Seeder;

class DetailTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Detail::factory()->count(5)->create();
    }
}
