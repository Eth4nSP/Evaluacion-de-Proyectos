<?php
namespace App\Http\Controllers\Estudiante;
use App\Http\Controllers\Controller;
use App\Models\Estudiante;
use App\Models\Docente;
use App\Models\Empresa;
use App\Models\Grupo;
use App\Models\Planificacion;
use App\Models\Sprint;
use App\Models\Semana;
use App\Models\EvaluacionesGrupo;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use Carbon\Carbon;

class SesionEstudianteController extends Controller
{  

    
    function getDataEstudiante() {
        // Fecha actual
        $now = Carbon::now();
        $idEstudiante = session('estudiante.id');
    
        // Obtener el estudiante y su nombre completo
        $estudiante = Estudiante::find($idEstudiante);
        $nombreCompleto = trim("{$estudiante->nombreEstudiante} {$estudiante->primerApellido} {$estudiante->segundoApellido}");
    
        // Obtener la empresa asociada al estudiante
        $empresa = $estudiante->empresas()->first();  // Usamos la relación de Estudiante con Empresas
        $idEmpresa = $empresa ? $empresa->idEmpresa : -1;
        $empresaPublicada = $empresa ? $empresa->publicada : 0;
    
        // Obtener el grupo asociado al estudiante
        $grupo = $estudiante->grupos()->first();  // Usamos la relación de Estudiante con Grupos
        $idGrupo = $grupo ? $grupo->idGrupo : -1;
        $fechaIniGestion = $grupo ? $grupo->fechaIniGestion : '1';
        $fechaLimiteEntregaEmpresa = $grupo ? $grupo->fechaLimiteEntregaEmpresa : '1';
        $fechaLimiteEntregaPlanificacion = $grupo ? $grupo->fechaLimiteEntregaPlanificacion : '1';
        $fechaFinPlanificacion = $grupo ? $grupo->fechaFinPlanificacion : '1';
        $fechaFinGestion = $grupo ? $grupo->fechaFinGestion : '1';
        $gestion = $grupo? trim("Gestion: {$grupo->gestionGrupo}, Grupo:{$grupo->numGrupo}"): 'No Tiene grupo';

        $evaluacionGrupo = null;
        if ($idGrupo !== -1) { // Si el grupo existe
            $evaluacionGrupo = EvaluacionesGrupo::where('idGrupo', $idGrupo)->first();
        }

        $planificacion = Planificacion::where('idEmpresa', $idEmpresa)->first();
        $idPlanificacion = $planificacion ? $planificacion->idPlanificacion : -1;
        $aceptada = $planificacion ? (($planificacion->aceptada)!==null? $planificacion->aceptada:0) : 0;
        $publicada = $planificacion ? (($planificacion->publicada)!==null? $planificacion->publicada:0) : 0;

        $idSprint = -1;
        $sprint = Sprint::where('idPlanificacion', $idPlanificacion)
                        ->whereDate('fechaIni', '<=', $now)
                        ->whereDate('fechaFin', '>=', $now)
                        ->first();
        $fechaLimiteSprint = '';
        $fechaIniSprint = '';
        if ($sprint) {
            $idSprint = $sprint->idSprint;
            $fechaLimiteSprint = $sprint->fechaFin;
            $fechaIniSprint = $sprint->fechaIni;
        }
    
        // Validar semana
        $idSemana = -1;
        $semana = Semana::where('idPlanificacion', $idPlanificacion)
                        ->whereDate('fechaIni', '<=', $now)
                        ->whereDate('fechaFin', '>=', $now)
                        ->where('idPlanificacion', $idPlanificacion)
                        ->first();
        $fechaLimiteSemana = '';
        $fechaIniSemana = '';
        if ($semana) {
            $idSemana = $semana->idSemana;
            $fechaLimiteSemana = $semana->fechaFin;
            $fechaIniSemana = $semana->fechaIni;
        }
    
        return response()->json([
            "idEstudiante" => $idEstudiante,
            'nombreCompleto' => $nombreCompleto,
            'idEmpresa' => $idEmpresa,
            'empresaPublicada' =>$empresaPublicada,
            'idPlanificacion' => $idPlanificacion,
            'aceptada' => $aceptada,
            'publicada' => $publicada,
            'idSprint' => $idSprint,
            'idSemana' => $idSemana,
            'idGrupo' => $idGrupo,    
            'fechaIniGestion' => $fechaIniGestion,
            'fechaLimiteEntregaEmpresa' => $fechaLimiteEntregaEmpresa,
            'fechaLimiteEntregaPlanificacion' => $fechaLimiteEntregaPlanificacion,
            'fechaFinPlanificacion' => $fechaFinPlanificacion,
            'fechaFinGestion' => $fechaFinGestion,
            'gestion' => $gestion,
            'fechaIniSprint' => $fechaIniSprint,
            'fechaIniSemana' => $fechaIniSemana,
            'fechaLimiteSprint' => $fechaLimiteSprint,
            'fechaLimiteSemana' => $fechaLimiteSemana,
            'tipoEvaluacion' => $evaluacionGrupo?$evaluacionGrupo->tipoEvaluacion:'1',
            'fechaEvaluacion' => $evaluacionGrupo?$evaluacionGrupo->fechaEvaluacion:'1',
        ], 200);
    }
    
    
    public function getGrupoSesion() {
        if ($idEstudiante = session('estudiante.id')) {
            $grupo = DB::table('grupo as g')
                ->join('estudiantesgrupos as eg', 'g.idGrupo', '=', 'eg.idGrupo')
                ->where('eg.idEstudiante', $idEstudiante)
                ->select('g.idGrupo') // Seleccionar solo el campo necesario
                ->first();
            if ($grupo) {
                return response()->json(['idGrupo' => $grupo->idGrupo], 200);
            }
            return response()->json(['idGrupo' => '-1'], 200);
        }
        return response()->json(['error' => 'Usuario no encontrado'], 404);
    }
}