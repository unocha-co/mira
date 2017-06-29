<?php

namespace App\Http\Controllers;

use App\SurveyBorough;
use App\Questions;
use App\Respondents;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        /*
        $questions = Questions::with(['answers', 'topic'])->get();
        foreach ($questions as $q) {
           $q->series = $q->answers->groupBy('answer');
        }
        return $questions;*/
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
        return SurveyBorough::with(['borough.department','topics.questions.text', 'respondents'])->findOrFail($id);
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

    public function questions($surv_id){
        $resource = SurveyBorough::with(['topics.questions.text', 'topics.questions.options.answers', 'topics.questions.options.subOptions.answers'])->findOrFail($surv_id);
        $questions = [];
        foreach ($resource->topics as $topic) {
            foreach ($topic->questions as $question) {
                $data = $this->resolveGraph($question->id, $surv_id);
                $data['question'] = $question;
                $questions[] = $data;
            }
        }        
        return $questions;
    }

    public function resolveGraph($question_id, $surv_id)
    {
        $resolved = [];
        $totalPeople = 0;

        $respondents = Respondents::where('surv_bor_id','=',$surv_id)->get();
        $all = $respondents->count();

        $question = Questions::with('options.answers', 'options.subOptions.answers')->findOrFail($question_id);
        $resolved['utilities'] = json_decode($question->utilities);
        $options = $question->options;

        if($question->parent != 0){
            $parentQ = Questions::with('options.answers')->findOrFail($question->parent);
            if ($resolved['utilities']->checked_yes) {                
                foreach ($parentQ->options as $op) {
                    if ($op->keyvar=='si') {
                        $totalPeople = count($op->answers);
                    }
                }
            }else{
                $totalPeople = $all;
            }           
        }else{
            $totalPeople = $all;         
        }

        $resolved['respondent'] = $totalPeople;
        
        
        //dd($question);
        $resolved['values']=[];
        if(isset($resolved['utilities']->vertical) && $resolved['utilities']->vertical){
            $resolved['utilities']->stacked = false;
            $resolved['series'] = [];
            foreach ($parentQ->options as $op) {
                if (count($op->answers)!== 0) {
                   $resolved['labels'][] = $op->label;
                   $totalsarray[$op->label]= count($op->answers);
                }
            }
            foreach ($options as $op) {
                $resolved['series'][]=$op->label;
                $valuesarray = [];
                foreach ($resolved['labels'] as $l) {
                    $cont = 0;                 
                    foreach ($op->answers as $ans) {
                        if($ans->value == $l){
                            $cont++;
                        }
                    }
                    $valuesarray[]=round(($cont/$totalsarray[$l])*100,2);
                }
                $temparray[]=$valuesarray;          
            }
        $resolved['values'] = $temparray;
        }else if (isset($resolved['utilities']->global) && $resolved['utilities']->global) {
            $resolved['series']=[];
            $collection = SurveyBorough::with(['topics.questions'=>function($query){
                $query->where('keyvar','LIKE','%problema%'); 
            },'topics.questions.text', 'topics.questions.options.answers'])->findOrFail($surv_id);

            $topics = $collection->topics;
            foreach ($topics as $topic) {
                if(count($topic->questions)>0){
                    $temp = [];
                    $resolved['labels'][] = $topic->name;
                    $question = $topic->questions[0];
                    $resolved['utilities']->stacked = true;
                    foreach ($question->options as $op) {
                        if (!in_array($op->label,  $resolved['series'])) {
                            $resolved['series'][] = $op->label;
                        }
                        $temp[] = count($op->answers);
                    }
                    for ($i=0; $i < count($resolved['series']); $i++) { 
                           $resolved['values'][$i][] = $temp[$i];
                        }
                    
                }
            }
            return $resolved;
        }else{
            foreach ($options as $op) {
                if ($op->parent == 0) {
                    $resolved['labels'][] = $op->label;
                    $resolved['series']=[];
                    $temp = [];
                    if (count($op->subOptions)>0) {
                        $resolved['utilities']->stacked = true;
                        foreach ($op->subOptions as $subOption) {
                            if (!in_array($subOption->label,  $resolved['series'])) {
                                 $resolved['series'][] = $subOption->label;
                            }
                            $temp[] = count($subOption->answers);                         
                        }
                        for ($i=0; $i < count($resolved['series']); $i++) { 
                           $resolved['values'][$i][] = $temp[$i];
                        }
                    }else{
                        $resolved['utilities']->stacked = false;
                        $resolved['series'][] = 'answers';

                        if ($resolved['utilities']->priority) {
                            $totalClusters = count($resolved['utilities']->weights);
                            $temp = array_fill(0, $totalClusters, 0);
                            foreach ($op->answers as $ans) {
                                $index = intval($ans->value) - 1;
                                $temp[$index]++;
                            }
                            $total = 0;
                            foreach ($temp as $key => $value) {
                                $temp[$key] = $value*$resolved['utilities']->weights[$key];
                                $total += $temp[$key];
                            }
                            $resolved['values'][] = $total;
                        }else{
                            $resolved['values'][] = intval(count($op->answers));
                        }                    
                    }              
                }
            }
            if($resolved['utilities']->normalized){
                $resolved['values'] = $this->normalize($resolved['values'], $totalPeople, $resolved['utilities']->priority);
            }
        }
        return $resolved;
    }

    private function normalize($data, $totalPeople, $priorityFlag){
        if ($priorityFlag) {
            foreach ($data as $key => $value) {
                    $data[$key] = round($value/$totalPeople, 2);
            }
        }else{
           foreach ($data as $key => $value) {
                    $data[$key] = round($value/$totalPeople * 100, 2);
            } 
        }

        return $data;
    }   

}
