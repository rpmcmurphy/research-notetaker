<?php

namespace Database\Seeders;

use App\Models\Topic;
use App\Models\Detail;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call([
        //     TopicTableSeeder::class,
        //     DetailTableSeeder::class,
        // ]);


        // Seed all together
        $topics = Topic::factory()->count(50)->create();
        $details = Detail::factory()->count(50)->create();
        $details->each(function ($d) use ($topics) {
            $d->topics()->attach(
                $topics->random(rand(2, 3))->pluck('id')->toArray()
            );
        });
    }
}
