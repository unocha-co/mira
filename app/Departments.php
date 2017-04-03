<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Departments extends Model
{
    public function boroughs(){
    	return $this->hasMany('App\Boroughs', 'department_id');
    }
}
