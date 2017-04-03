<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Surveys extends Model
{
    public function boroughs(){
    	return $this->hasMany('App\SurveyBorough', 'survey_id');
    }
}
