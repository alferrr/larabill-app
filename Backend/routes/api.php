<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\BudgetController;

Route::post('/register', [AuthController::class,'register']);
Route::post('/login', [AuthController::class,'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class,'user']);
    Route::post('/logout', [AuthController::class,'logout']);

    Route::get('/subscriptions', [SubscriptionController::class,'index']);
    Route::post('/subscriptions', [SubscriptionController::class,'store']);
    Route::patch('/subscriptions/{subscription}/toggle', [SubscriptionController::class,'togglePaid']);
    Route::delete('/subscriptions/{subscription}', [SubscriptionController::class,'destroy']);
    Route::get('/subscriptions/top-categories', [SubscriptionController::class, 'topCategories']);

    Route::get('/budget', [BudgetController::class, 'index']);
    Route::post('/budget', [BudgetController::class, 'store']); 
    Route::delete('/budget', [BudgetController::class, 'destroyAll']); 
});


