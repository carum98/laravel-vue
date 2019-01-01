<?php

use Illuminate\Database\Seeder;
use App\tasks;

class TasksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(tasks::class, 35)->create();
    }
}
