<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
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

Route::get('/usuarios',[HomeController::class, 'usuarios']);
Route::post('/bar/{start_date}/{end_date}',[HomeController::class, 'bar']);
Route::post('/pizza/{start_date}/{end_date}',[HomeController::class, 'pizza']);
Route::get('/data/{user}/{start_date}/{end_date}',[HomeController::class, 'data']);
Route::get('/ranges',[HomeController::class, 'ranges']);
Route::get('/clientes',[HomeController::class, 'clientes']);