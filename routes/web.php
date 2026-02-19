<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PostsController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['guest'])->group(function () {
    Route::get('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/login', [AuthController::class, 'login_user'])->name('login_user');
    Route::get('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/register', [AuthController::class, 'register_user'])->name('register_user');
});

//create an auth middleware group
Route::middleware(['auth'])->group(function () {
   
   Route::get('/', [PageController::class, 'home'])->name('home');
   
   Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

   Route::post('/create', [PostsController::class, 'create'])->name('create');

   Route::post('/update', [PostsController::class, 'update'])->name('update');

   Route::post('/delete', [PostsController::class, 'delete'])->name('delete');
   
   Route::get('/edit-profile', [AuthController::class, 'edit'])->name('edit');

   Route::post('/profile/update', [AuthController::class, 'update'])->name('update');

});

