<?php

namespace App\Http\Controllers;

use App\Models\Empresa;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;

class EmpresaController extends Controller
{
    public function getEmpresaData($id)
    {
        // Obtener la empresa con el ID proporcionado
        $empresa = Empresa::with('estudiantes')->find($id);

        // Verificar si la empresa existe
        if (!$empresa) {
            return response()->json(['error' => 'Empresa no encontrada'], 404);
        }
        
        // Formatear los datos
        $data = [
            'nombreEmpresa' => $empresa->nombreEmpresa,
            'nombreLargo' => $empresa->nombreLargo,
            'integrantes' => $empresa->estudiantes->map(function ($estudiante) {
                return [
                    'nombreEstudiante' => $estudiante->nombreEstudiante,
                    'primerApellido' => $estudiante->primerApellido,
                    'segundoApellido' => $estudiante->segundoApellido,
                    'rol'=> $estudiante ->rol
                ];
            }),
        ];

        // Devolver los datos en formato JSON
        return response()->json($data);
    }
    public function getNombreEmpresa($id)
    {
        // Obtener la empresa con el ID proporcionado
        $empresa = Empresa::with('estudiantes')->find($id);

        // Verificar si la empresa existe
        if (!$empresa) {
            return response()->json(['error' => 'Empresa no encontrada'], 404);
        }
        
        // Formatear los datos
        $data = [
            'nombreEmpresa' => $empresa->nombreEmpresa,
            'nombreLargo' => $empresa->nombreLargo,
        ];

        // Devolver los datos en formato JSON
        return response()->json($data);
    }


    // En el futuro debera filtrar por ID del docente !!!!!!!!
    // formato aproximado:

    // $empresas = Empresa::whereHas('docente', function($query) use ($idDocente) {
    //     $query->where('idDocente', $idDocente);
    // })->orderBy('nombreEmpresa', 'asc')->get();
    
    public function getListaEmpresas()
    {
        // esta formateado para buscar por orden alfabetico
        $empresa = Empresa::orderBy('nombreEmpresa', 'asc')->get();

        // Devolver error si no existe
        if (!$empresa) {
            return response()->json(['error' => 'Empresa no encontrada'], 404);
        }

        // Formatear xd
        $data = $empresa->map(function ($empresa) {
            return [
                'idEmpresa' => $empresa->idEmpresa,
                'nombreEmpresa' => $empresa->nombreEmpresa,
                'nombreLargo' => $empresa->nombreLargo,
            ];
        });


        //return response()->json($data);
        return $data;
    }
    public function obtenerSprints($idEmpresa, $idDocente)
    {
        try {
           
            $empresa = Empresa::findOrFail($idEmpresa);

            $sprints = $empresa->sprints;

            return response()->json([
                'success' => true,
                'nombre' => $empresa->nombreEmpresa,
                'nombreLargo' => $empresa->nombreLargo,
                'idDocente' => $idDocente,
                'sprints' => $sprints
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener los sprints: ' . $e->getMessage()
            ], 500);
        }
    }
}