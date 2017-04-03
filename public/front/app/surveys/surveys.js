'use strict';

angular.module('koboG')
    .config(function ($stateProvider) {
        $stateProvider.state({
            name: 'surveys',
            url: '/surveys/:id',
            controller: 'SurveysCtrl',
            templateUrl: 'surveys/surveys.html'
        });
    })

   .controller('SurveysCtrl', function ($q, $scope, $stateParams,$timeout,apiService,graphService) {

        $scope.accordion = {
            status:{}
        }
        $scope.showAllCharts = false;
        //Chart.defaults.global.colors = [ '#803690', '#00ADF9', '#949FB1', '#46BFBD', '#FDB45C', '#DCDCDC', '#4D5360'];

        Chart.plugins.register({//make the background color of the canvas white, for image download
          beforeDraw: function(chartInstance) {
            var ctx = chartInstance.chart.ctx;
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, chartInstance.chart.width, chartInstance.chart.height);
          }
        });

        apiService.api.get('survey/'+ $stateParams.id).then(function (res) {
            $scope.localization = res.data.borough;
            $scope.topics = res.data.topics;
            $scope.respondents = res.data.respondents;
        });

        /*$scope.$on('chart-create', function (evt, chart) {
            $scope.chart = chart;
        });*/
        $scope.check = function (){
            console.log($scope);
            if(!$scope.topic){
                $scope.question = "";
            }
        }

        $scope.getGraphData = function (question){
            $scope.showAllCharts = false;
            if (question) {
                apiService.api.get('question/' + question.id).then(function (res){
                    if (res.data.utilities.stacked && !res.data.utilities.priority) {
                        $scope.data = res.data.values;
                        $scope.labels = res.data.labels;
                    }else{
                        $scope.data = [];
                        $scope.labels = [];
                        var values = [];
                        var sortedObject = graphService.sort(res.data.values, res.data.labels);
                        for (var k = 0; k < sortedObject.length; k++) {
                            $scope.labels[k] = sortedObject[k].label;
                            values[k] = sortedObject[k].val;
                        }
                        $scope.data = values;
                    }
                    if (res.data.series.length > 1) {
                       $scope.series = res.data.series; 
                    }                                    
                    $scope.utilities = res.data.utilities;
                    $scope.questionRespondents = res.data.respondent;
                    $scope.options = graphService.options(question, res.data.utilities);                              
                });
            }
            console.log($scope);
        };

        $scope.getAnswers = function (respondent){
            $scope.showAllCharts = false;
            if (respondent) {
                apiService.api.get('respondent/'+$stateParams.id+'/'+respondent.id).then(function (res){
                    $scope.individualAnswers = res.data;            
                });
            }
            console.log($scope);
        };

        $scope.loadCompleteData = function (){
            $scope.dataAll = [];
            $scope.showAllCharts = true;
            apiService.api.get('questions/' + $stateParams.id).then(function (res){
                res.data.forEach(function (question, i){
                        var questionObj = {
                            data : [],
                            labels : [],
                            options : [],
                            series : [],
                            utilities:[],
                            questionRespondents: 0,
                            question : [],
                        };
                            if (question.utilities.stacked && !question.utilities.priority) {
                                questionObj.data = question.values;
                                questionObj.labels = question.labels;
                            }else{
                                var values = [];
                                var sortedObject = graphService.sort(question.values, question.labels);
                                for (var k = 0; k < sortedObject.length; k++) {
                                    questionObj.labels[k] = sortedObject[k].label;
                                    values[k] = sortedObject[k].val;
                                }
                                questionObj.data = values;
                            }
                            if (question.series.length > 1) {
                               questionObj.series = question.series; 
                            }                                    
                            questionObj.utilities = question.utilities;
                            questionObj.questionRespondents = question.respondent;
                            questionObj.question = question.question;
                            questionObj.options = graphService.options(question.question, question.utilities);
                            $scope.dataAll.push(questionObj);
                    });
                });
            console.log($scope);
            };

        $scope.downloadPNG = function () {
                var canvas = document.querySelector('#chartKOBO canvas');
                    
                var context = canvas.getContext('2d');

                var dt = canvas.toDataURL('image/png');
                document.getElementById("btnpng").href = dt; 
                $scope.downloadReady = true;                           
      };
  });
