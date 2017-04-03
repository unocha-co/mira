<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Answers extends Model
{
    public $timestamps = false;

	public function option(){
		return $this->belongsTo('App\Options', 'option_id');
	}

	public function respondent(){
		return $this->belongsTo('App\Respondents', 'respondent_id');
	}
}
