<?php

namespace Database\Factories;

use App\Models\Topic;
use App\Models\Detail;
use Illuminate\Database\Eloquent\Factories\Factory;

class DetailFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Detail::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $topics = Topic::all()->pluck('id')->toArray();

        $images_array = [];

        for ($i = 0; $i < 3; $i++) {
            $generated_image = $this->faker->image(public_path('storage/files_images'), 640, 480, null, false);
            $images_array[] = 'files_images/' . $generated_image;
        }

        return [
            'details_name'  => $this->faker->text(15),
            'details'       => $this->faker->paragraph(2),
            'files_images'  => json_encode($images_array),
            'topic_id'      => $this->faker->randomElement($topics),
        ];
    }
}
