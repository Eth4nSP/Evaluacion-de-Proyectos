<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSprintTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sprint', function (Blueprint $table) {
            $table->id('idSprint');
            $table->unsignedBigInteger('idPlanificacion');
            $table->tinyInteger('numeroSprint');
            $table->date('fechaIni');
            $table->date('fechaFin');
            $table->date('fechaEntrega');
            $table->decimal('cobro',8,2);
            
            // * Llave foranea idPlanificacion
            $table->foreign('idPlanificacion')
                ->references('idPlanificacion')
                ->on('planificacion')
                ->onDelete('cascade');


            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_unicode_ci';
            $table->engine = 'InnoDB';
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sprint');
    }
};