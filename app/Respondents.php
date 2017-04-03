<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Respondents extends Model
{
    public $timestamps = false;

	public function answers(){
		return $this->hasMany('App\Answers', 'respondent_id');
	}
}
