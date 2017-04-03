<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Options extends Model
{
    public function answers(){
    	return $this->hasMany('App\Answers', 'option_id');
    }

    public function question(){
    	return $this->belongsTo('App\Questions', 'question_id');
    }

    public function parent(){
		return $this->belongsTo('App\Options', 'parent');
	}

	public function subOptions(){
		return $this->hasMany('App\Options', 'parent');
	}
}
