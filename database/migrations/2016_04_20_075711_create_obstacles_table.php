<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateObstaclesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('obstacles', function (Blueprint $table) {
            $table->increments('id');
            $table->double('size')->comment('障碍物半径');
            $table->double('lat')->comment('障碍物经度');
            $table->double('lon')->comment('障碍物纬度');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('obstacles');
    }
}
