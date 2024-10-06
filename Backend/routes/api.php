<?php
/*
esto es un prueba de subir al git 2
*/
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\PlanificacionController;
use App\Http\Controllers\RevisionPlaniController;
use App\Http\Controllers\TareaController;
use App\Http\Controllers\DocenteController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
/** 
 * TODOS LOS GETS VAN ACA
*/

Route::get('/empresa/{id}', [EmpresaController::class, 'getEmpresaData']);
Route::get('/nombreEmpresa/{id}', [EmpresaController::class, 'getNombreEmpresa']);
Route::get('/empresas/', [EmpresaController::class, 'getListaEmpresas']);
Route::get('/planificacion/{idEmpresa}', [PlanificacionController::class, 'show']);

//jhair
Route::put('/validar', [PlanificacionController::class, 'validar']);
Route::post('/addRevision', [RevisionPlaniController::class, 'addRevision']);

//jhon
Route::get('/planificacion/notaComentario/{idPlanificacion}', [PlanificacionController::class, 'notaComentario']);
Route::get('/planificacionAceptadas', [PlanificacionController::class, 'planificacionAceptadas']);
Route::get('/planificacionRechazadas', [PlanificacionController::class, 'planificacionRechazadas']);
Route::get('/tarea/{idTarea}', [TareaController::class, 'obtenerTarea']);
Route::get('/docente/empresa/{idEmpresa}', [PlanificacionController::class, 'obtenerDocentePorEmpresa']);
Route::get('/tareaFor/{idTarea}', [TareasController::class, 'obtenerTarea2']);
/**
 * TODOS LOS POST VAN 
 *
 */
//Para crear la planificacion o modificarla
Route::post('/planificacion/guardar', [PlanificacionController::class, 'crearPlanificacion']);

//Para calificar una tarea
//Adrian
Route::post('/tarea/{idTarea}/calificar', [TareaController::class, 'calificarTarea']);
Route::get('/docente/{idDocente}/empresas', [DocenteController::class, 'obtenerEmpresasPorDocente']);
Route::get('/empresa/{idEmpresa}/{idDocente}/sprints', [EmpresaController::class, 'obtenerSprints']);
