<?php

namespace App\Http\Controllers;

use App\SurveyBorough;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RespondentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function getAnswers($survey_id, $respondent_id){

        $resource = SurveyBorough::with(['topics.questions.options.answers'=>function ($query) use($respondent_id){
            $query->where('respondent_id','=',$respondent_id);
        },'topics.questions.text','topics.questions.options.subOptions.answers'=>function ($query) use($respondent_id){
            $query->where('respondent_id','=',$respondent_id);
        }])->where('id','=',$survey_id)->first();

        $data = $resource->topics;
        foreach ($data as $top) {
            foreach ($top->questions as $q) {
                $q['jsonUtilities'] = json_decode($q->utilities);
                foreach ($q->options as $op) {
                    if (count($op->subOptions)>0) {
                        $q['jsonUtilities']->stacked = true;
                        break;
                    }
                }
            }
        }
        return $data;
    }
}
