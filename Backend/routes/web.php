<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\PlanificacionController;
use App\Http\Controllers\RevisionPlaniController;

Route::get('/', function () {
    return view('welcome');
});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});




Route::get('/empresa/{id}', [EmpresaController::class, 'getEmpresaData']);
Route::get('/planificacion/{idEmpresa}', [PlanificacionController::class, 'show']);
Route::get('/planificacionAceptadas', [PlanificacionController::class, 'planificacionAceptadas']);
Route::get('/planificacionRechazadas', [PlanificacionController::class, 'planificacionRechazadas']);
Route::get('/planificaciones/{idPlanificacion}/sprints', [PlanificacionController::class, 'showP']);
Route::post('/planificaciones1/{idPlanificacion}/sprints', [PlanificacionController::class, 'agregarSprint']);
Route::put('/planificacion2/{idPlanificacion}/{idSprint}', [PlanificacionController::class, 'modificarSprint']);


//HU Validar Planificion
Route::put('/validar', [PlanificacionController::class, 'validar']);
Route::put('/modificarValidar', [RevisionPlaniController::class, 'addRevision']);

//tests
//test HU Validar Planificacion
//test para modificar la BD, añadiendo comentarios y nota en una tabla intermedia
//anade o sobreescribe una revision
Route::get('/prueba', [RevisionPlaniController::class, 'testAdd']);
//test para verificar si la funcion Validar funciona correctamente
Route::get('/prueba2', [PlanificacionController::class, 'testValidar']);

Route::get('/token', function () {
    return csrf_token();
});
