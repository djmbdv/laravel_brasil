<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DataController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/usuarios',[DataController::class, 'usuarios']);
Route::post('/bar/{start_date}/{end_date}',[DataController::class, 'bar']);
Route::post('/pizza/{start_date}/{end_date}',[DataController::class, 'pizza']);
Route::get('/data/{user}/{start_date}/{end_date}',[DataController::class, 'data']);
Route::get('/ranges',[DataController::class, 'ranges']);
Route::get('/clientes',[DataController::class, 'clientes']);