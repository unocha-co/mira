<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Boroughs extends Model
{
    public function surveys(){
    	return $this->hasMany('App\SurveyBorough', 'borough_id');
    }

    public function department(){
    	return $this->belongsTo('App\Departments', 'department_id');
    }
}
