<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::group(['middleware' => ['web']], function () {

    Route::get('/', function () {
        return view('index');
    });

    Route::post('/transform','IndexController@transform');

    Route::get('/view',function(){
        return view('view');
    });

    Route::get('/hello',function(){
        return 'hello world';
    });

    Route::get('car/add/{num?}','CarController@add')->middleware(['cors']);
    Route::get('car/delete/{id}','CarController@delete');
    Route::resource('car','CarController');

    Route::resource('operate','OperateController')->middleware(['cors']);

    Route::resource('obstacle','ObstacleController')->middleware(['cors']);
});
