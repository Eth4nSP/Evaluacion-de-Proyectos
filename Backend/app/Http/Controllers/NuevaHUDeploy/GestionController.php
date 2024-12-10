<?php
namespace App\Http\Controllers\NuevaHUDeploy;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Grupo;

class GestionController extends Controller{
    public function visualizarSemestresEstudiante(){
        $idEstudiante = session('estudiante.id');
        $result = DB::table('grupo as g')
        ->join('estudiantesgrupos as eg', 'g.idGrupo','=','eg.idGrupo')
        ->join('estudiante as e','eg.idEstudiante','=','e.idEstudiante')
        ->select('g.gestionGrupo')
        ->where('e.idEstudiante',$idEstudiante)
        ->get();
        

        return response()->json($result, 200);
    }

    public function visualizarSemestresDocente(){
        $idDocente = session('docente.id');
        $result = DB::table('grupo as g')
        ->join('docente as d', 'g.idDocente','=','g.idDocente')
        ->select('g.gestionGrupo')
        ->where('d.idDocente',$idDocente)
        ->get();
        

        return response()->json($result, 200);
    }

    public function crearSemestre(Request $request){
        // Validar el formato de entrada
        $request->validate([
            'gestionGrupo' => 'required|string'
        ]);

        // Obtener el valor enviado
        $gestionActual = $request->input('gestionGrupo');

        // Separar el año y el semestre
        [$anio, $semestre] = explode('-', $gestionActual);
        //$anio = (int) $anio;
        //$semestre = (int) $semestre;

        // Calcular la nueva gestión
        if ($semestre === 2) {
            $anio++; // Si es segundo semestre, incrementa el año
            $semestre = 1; // Reinicia al primer semestre
        } else {
            $semestre = 2; // Si es primer semestre, pasa al segundo
        }
        $nuevaGestion = "{$anio}-{$semestre}";

        // Obtener el id del docente desde la sesión
        $idDocente = session('docente.id');
        $existe = grupo::where('gestionGrupo', $nuevaGestion)
        ->where('idDocente', $idDocente)
        ->exists();

        if ($existe) {
        return response()->json([
            'message' => 'La gestión ya existe para este docente.',
            ], 409); // Código de respuesta 409 (Conflicto)
        }

        // Guardar en la base de datos si no existe
        $gestion = new grupo();
        $gestion->gestionGrupo = $nuevaGestion;
        $gestion->idDocente = $idDocente; // Asociar la gestión con el docente
        $gestion->save();

        return response()->json([
            'message' => 'Gestión creada con éxito.',
            'nuevaGestion' => $nuevaGestion,], 201);
    }      
}   