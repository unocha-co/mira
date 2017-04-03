<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Questions extends Model
{

	public $timestamps = false;

	public function options(){
		return $this->hasMany('App\Options', 'question_id');
	}

	public function topic(){
		return $this->belongsTo('App\Topics', 'topic_id');
	}

	public function text(){
		return $this->belongsTo('App\Q_text', 'text_id');
	}

	public function parent(){
		return $this->belongsTo('App\Questions', 'parent');
	}

	public function subQuestions(){
		return $this->hasMany('App\Questions', 'parent');
	}
}
