<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetailTopicTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('detail_topic', function (Blueprint $table) {
            $table->bigInteger('detail_id')->unsigned()->index();
            $table->bigInteger('topic_id')->unsigned()->index();

            $table->foreign('topic_id')->references('id')->on('topics')->onDelete('cascade');
            $table->foreign('detail_id')->references('id')->on('details')->onDelete('cascade');
            $table->primary(['detail_id', 'topic_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('detail_topics');
    }
}
