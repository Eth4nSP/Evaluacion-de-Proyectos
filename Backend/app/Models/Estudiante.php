<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Estudiante extends Model
{
    protected $table = 'estudiante';
    protected $primaryKey = 'idEstudiante';
    public $timestamps = false;

    public function grupos()
    {
        return $this->belongsToMany(Grupo::class, 'estudiantesgrupos', 'idEstudiante', 'idGrupo');
    }
    public function tareas()
    {
        return $this->belongsToMany(Tarea::class, 'tareasestudiantes', 'idEstudiante', 'idTarea');
    }
}

    
