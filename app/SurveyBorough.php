<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SurveyBorough extends Model
{
    protected $table = 'survey_borough';

    public function survey(){
    	return $this->belongsTo('App\Surveys', 'survey_id');
    }

    public function borough(){
    	return $this->belongsTo('App\Boroughs', 'borough_id');
    }

    public function topics(){
    	return $this->hasMany('App\Topics', 'surv_bor_id');
    }

    public function respondents(){
        return $this->hasMany('App\Respondents', 'surv_bor_id');
    }
}
