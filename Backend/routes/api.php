<?php
/*
esto es un prueba de subir al git 2
*/
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\PlanificacionController;
use App\Http\Controllers\RevisionPlaniController;

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

Route::get('/empresa/{id}', [EmpresaController::class, 'getEmpresaData']);
Route::get('/empresas/', [EmpresaController::class, 'getListaEmpresas']);

Route::get('/planificacion/{idEmpresa}', [PlanificacionController::class, 'show']);
Route::get('/planificacion/validar/{idPlanificacion}', [PlanificacionController::class, 'validar']);

Route::put('/validar', [PlanificacionController::class, 'validar']);
Route::post('/addRevision', [RevisionPlaniController::class, 'addRevision']);

