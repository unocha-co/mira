<?php

use Illuminate\Http\Request;

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
Route::get('question/{id}/{id_s}', 'SurveyController@resolveGraph');
Route::get('questions/{id_s}', 'SurveyController@questions');
Route::get('respondent/{id_s}/{id_r}', 'RespondentController@getAnswers');
Route::resource('survey', 'SurveyController');
//Route::resource('topics', 'SurveyController');
Route::resource('data', 'DataController');
