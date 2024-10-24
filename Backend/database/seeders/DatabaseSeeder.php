<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // * Poblar clase docente
        $this->call(DocenteSeeder::class);
        $this->call(EmpresaSeeder::class);
        $this->call(GrupoSeeder::class);
        $this->call(EstudianteSeeder::class);


        $this->call(EstudiantesEmpresasSeeder::class);
        $this->call(EstudiantesGruposSeeder::class);
        $this->call(PlanificacionSeeder::class);
        $this->call(SprintSeeder::class);
        $this->call(SemanaSeeder::class);
        $this->call(TareaSeeder::class);
        $this->call(TareasEstudiantesSeeder::class);
    }
}
