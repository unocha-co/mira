<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Topics extends Model
{
    public function questions(){
		return $this->hasMany('App\Questions', 'topic_id');
	}

	public function surveyBorough(){
		return $this->belongsTo('App\SurveyBorough', 'surv_bor_id');
	}
}
