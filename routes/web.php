<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\DetailController;
use App\Http\Controllers\DownloadsController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
/*
 * React route
 */
// Route::get('/react', function () {
//     return view('react.index');
// });

Route::view('{path}', 'react.index')->where('path', '([A-z\d\-\/_.]+)?');

/*
 * Laravel core routes
 */

// Route::get('/', [HomeController::class, 'index'])->name('home');

// Route::get('/topics', [TopicController::class, 'index'])->name('topics.index');
// Route::get('/topics/create', [TopicController::class, 'create'])->name('topics.create');
// Route::post('/topics', [TopicController::class, 'store'])->name('topics.store');
// Route::get('/topics/{id}', [TopicController::class, 'show'])->name('topics.show');
// Route::get('/topics/{id}/edit', [TopicController::class, 'edit'])->name('topics.edit');
// Route::post('/topics/{id}', [TopicController::class, 'update'])->name('topics.update');
// Route::post('/topics/destroy/{id}', [TopicController::class, 'destroy'])->name('topics.destroy');

// Details 
// Route::get('/details', [DetailController::class, 'index'])->name('details.index');
// Route::get('/details/create', [DetailController::class, 'create'])->name('details.create');
// Route::post('/details', [DetailController::class, 'store'])->name('details.store');
// Route::get('/details/{id}', [DetailController::class, 'show'])->name('details.show');
// Route::get('/details/{id}/edit', [DetailController::class, 'edit'])->name('details.edit');
// Route::post('/details/{id}', [DetailController::class, 'update'])->name('details.update');
// Route::post('/details/destroy/{id}', [DetailController::class, 'destroy'])->name('details.destroy');
// Route::post('/details-delete-file', [DetailController::class, 'delete_file'])->name('details.delete_file');

// Route::get('/search', [DetailController::class, 'search'])->name('search');
// Route::post('/search', [DetailController::class, 'search_result'])->name('search.result');

// Route::get('/download/{file_path}', [DownloadsController::class, 'download'])->name('download');