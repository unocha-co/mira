'use strict';

angular.module('koboG')
    .config(function ($stateProvider) {
        $stateProvider.state({
            name: 'surveys',
            url: '/surveys/:sur',
            controller: 'SurveysCtrl',
            templateUrl: 'surveys/surveys.html'
        });
    })

    .controller('SurveysCtrl', function ($scope, $stateParams,$timeout) {

        Chart.plugins.register({
          beforeDraw: function(chartInstance) {
            var ctx = chartInstance.chart.ctx;
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, chartInstance.chart.width, chartInstance.chart.height);
          }
        });

        var total = 0;
        $scope.mainTopics=[
        {
            label:'Problemas severos', 
            value:'problemas-severos'
        },
        {
            label:'Prioridad', 
            value:'prioridad',
            questions:[{
                label:'Identifique las áreas problemáticas prioritarias dentro de su comunidad entre todos los elementos que se identifican como "un problema severo"', 
                value:'prio_a'
            },
            {
                label:'Para cada área problemática, liste los sub-grupos dentro de su comunidad que pueden ser los más afectados', 
                value:'prio_b'
            },
            {
                label:'Para cada área problemática, liste los sub-grupos dentro de su comunidad que pueden ser los más afectados', 
                value:'prio_c'
            }]      
        },
        {
            label:'Agua', 
            value:'agua-fuentes'
        }];

        $scope.getQuestions = function (topic){
            $scope.showBarP = false;
            $scope.showBarC = false;
            $scope.showBarD = false;
            $scope.showBarE = false;

            $scope.selectedTopic = $scope.mainTopics.filter(function (v){
                return (v.value === topic);
            });

            if($scope.selectedTopic.length > 0){
                if(topic==='agua-fuentes'){
                    $scope.showBarE = true;
                    $scope.showBar = false;
                }else{
                    $scope.showBar = $scope.selectedTopic[0].questions ? false : true;
                }
            }else{
                $scope.showBar = false;
            }
        };

        $scope.log = function(question){
            if (question === 'prio_a') {
               $scope.showBarP = true;
               $scope.showBar = false;
               $scope.showBarC = false;
               $scope.showBarD = false;
               $scope.showBarE = false;  
            };

            if (question === 'prio_b') {
               $scope.showBarP = false;
               $scope.showBar = false;
               $scope.showBarC = true;
               $scope.showBarD = false;               
               $scope.showBarE = false; 
            };

            if (question === 'prio_c') {
               $scope.showBarP = false;
               $scope.showBar = false;
               $scope.showBarC = false; 
               $scope.showBarD = true;               
               $scope.showBarE = false;
            };
        }

        $scope.downloadPNG = function () {
            if($scope.showBarE){
                var canvas = document.getElementById("base");
                var context = canvas.getContext("2d");

                var dt = canvas.toDataURL('image/png');
                document.getElementById("btnpng").href = dt;
            }else{
                var canvas = document.getElementById("bar");
                var context = canvas.getContext("2d");

                var dt = canvas.toDataURL('image/png');
                console.log(this);
                document.getElementById("btnpng").href = dt;
            }
        
      };
//-------Configuración gráfica problemas severos
        $scope.data = [];
        $scope.sur = $stateParams.sur;

        $scope.labels = ['Protección','Agua', 'Saneamiento', 'Ingresos', 'Alimentación', 'Artículos no alimentarios', 'Salud mental', 'Educación', 'Información',
                        'Derechos legales','Vivienda/Albergue','Higiene','Atención médica','Movilización','Tiempo libre','Infraestructura','Salud física','Cuidado comunitario',
                        'Apoyo comunitario','Separación','Desplazamiento','Ayuda','Respeto','Violencia','Alcohol/drogas','Cuidado familiar','Trastorno mental'];
        $scope.series = ['Yes', 'No', 'DK/NA/REF'];

        $scope.type = 'StackedBar';
        $scope.colors = ["rgba(60,55,164,1)","rgba(173,9,0,1)","rgba(27,113,14,1)"];


    var data = [
        [6, 5, 5, 5, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1],
        [0, 1, 1, 1, 2, 2, 2, 2, 1, 1, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 4, 4, 4, 4, 4, 5, 5],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
      ];


      data.forEach(function (v,i){
        total = total + v[0];
      });

       data.forEach(function (v,i){
        var percentages = v.map(function (val, ind){
            return (val*100)/total;
        })
        $scope.data.push(percentages);
      });
      
      $scope.options = {
        title: {
            display: true,
            text: 'Existe un severo problema en su comunidad (vereda, pueblo, barrio, albergues, etc.) con…',
            fontSize: 20,
        },
        scales: {
            xAxes: [{
              stacked: true,
              categoryPercentage: 0.5,
              barPercentage: 0.5,
            }],
            yAxes: [{
              stacked: true,
              ticks: {            
                   min: 0,
                   max: 100,
                   callback: function(value){return value+ "%"}
                },
            }]
          },
      };

//-------Configuración gráfica prioridad - A
        $scope.labelsP = ['Protección','Seguridad Alimentaria y Nutrición', 'Agua, Saneamiento e Higiene (WASH)', 'Educación en emergencia', 'Salud', 'Otra área', 
                        'Albergue de Emergencia', 'Recuperación Temprana'];

        $scope.seriesP = ['normalizado'];

        $scope.typeP = 'StackedBar';
        $scope.colorsP = ["rgba(60,55,164,1)","rgba(173,9,0,1)","rgba(27,113,14,1)"];


    var dataP = [
        [9.333333, 4, 3.333333, 2.666667, 2, 1.666667, 0]
      ];

     $scope.dataP = dataP;
      
      $scope.optionsP = {
        title: {
            display: true,
            text: 'Identifique las áreas problemáticas prioritarias dentro de su comunidad entre todos los elementos que se identifican como "un problema severo"',
            fontSize: 15,
        },
      };

//-------Configuración gráfica prioridad - B

        $scope.labelsC = ['1. Protección (7 encuestados)','2. Seguridad Alimentaria y Nutrición (3 encuestados)', '3. Agua, Saneamiento e Higiene (WASH) (2 encuestados)', 
                            '4. Educación en emergencia (2 encuestados)', '5. Salud (2 encuestados)', '6. Otra área (1 encuestados)', '7. Albergue de Emergencia (1 encuestados)'];

        $scope.seriesC = ['Hombres','Mujeres','Niños','Niñas','Personas mayores','Personas con discapacidades','Grupos étnicos o religiosos','Otro','Todos afectados','No sabe'];

        $scope.typeC = 'StackedBar';
        $scope.colorsC = ["rgba(60,55,164,1)","rgba(173,9,0,1)","rgba(27,113,14,1)"];


    var dataC = [
        [0, 0, 0, 0, 0, 0, 0],
        [14, 0, 0, 0, 0, 0, 0],
        [0, 100, 100, 100, 0, 0, 0],
        [0, 100, 100, 100, 0, 0, 0],
        [0, 33, 50, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [100, 0, 0, 0, 100, 100 ,100],
        [0, 0, 0, 0, 0, 0, 0],
      ];

     $scope.dataC = dataC;
      
      $scope.optionsC = {
        title: {
            display: true,
            text: 'Para cada área problemática, liste los sub-grupos dentro de su comunidad que pueden ser los más afectados',
            fontSize: 15,
        },
        scales: {
            xAxes: [{
              categoryPercentage: 1,
              barPercentage: 0.7,
            }],
            yAxes: [{
              ticks: {            
                   min: 0,
                   max: 100,
                   callback: function(value){return value+ "%"}
                },
            }]
          },
      };
//-------Configuración gráfica prioridad - C
        $scope.labelsD = ['Hombres','Mujeres','Niños','Niñas','Personas mayores','Personas con discapacidades','Grupos étnicos o religiosos','Otro','Todos afectados','No sabe'];

        $scope.seriesD = ['1. Protección (7 encuestados)','2. Seguridad Alimentaria y Nutrición (3 encuestados)', '3. Agua, Saneamiento e Higiene (WASH) (2 encuestados)', 
                            '4. Educación en emergencia (2 encuestados)', '5. Salud (2 encuestados)', '6. Otra área (1 encuestados)', '7. Albergue de Emergencia (1 encuestados)'];

        $scope.typeD = 'StackedBar';
        $scope.colorsD = ["rgba(60,55,164,1)","rgba(173,9,0,1)","rgba(27,113,14,1)"];


    var dataD = [
        [0, 14, 0, 0, 0, 0, 0, 0, 100, 0],
        [0, 0, 100, 100, 33, 0, 0, 0, 0 ,0],
        [0, 0, 100, 100, 50, 0, 0, 0, 0 ,0],
        [0, 0, 100, 100, 0, 0, 0 ,0],
        [0, 0, 0, 0, 0, 0, 0, 0, 100 ,0],
        [0, 0, 0, 0, 0, 0, 0, 0, 100 ,0],
        [0, 0, 0, 0, 0, 0, 0, 0, 100 ,0]
      ];

     $scope.dataD = dataD;
      
      $scope.optionsD = {
        title: {
            display: true,
            text: 'Para cada área problemática, liste los sub-grupos dentro de su comunidad que pueden ser los más afectados',
            fontSize: 15,
        },
        scales: {
            xAxes: [{
              categoryPercentage: 1,
              barPercentage: 0.7,
            }],
            yAxes: [{
              ticks: {            
                   min: 0,
                   max: 100,
                   callback: function(value){return value+ "%"}
                },
            }]
          },
      };
//-------Configuración gráfica AGUA
        $scope.labelsE = ['viii. Agua superficial (quebrada, rio o lago)','iii. Nacimiento','iv. Pozo abierto protegido ','vi. Recolección de agua lluvia',
                        'i. Perforación o pozo con bomba de funcionamiento a motor','ii. Perforación o pozo con bomba de funcionamiento manual',
                        'v. Acueducto','vii. Pozo abierto desprotegido','ix. Vendedores de agua (incl. carrotanques privados)','x. Ayuda humanitaria','N. Ninguna','NS. No sabe', 'Otra'];

        $scope.seriesE = ['Valor'];

        $scope.typeE = 'horizontalBar';
        $scope.colorsE = ["rgba(60,55,164,1)","rgba(173,9,0,1)","rgba(27,113,14,1)"];


    var dataE = [
        [100, 60, 20, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0],      
        ];

     $scope.dataE = dataE;
      
      $scope.optionsE = {
        title: {
            display: true,
            text: '¿Cuáles son las fuentes principales de agua en su comunidad?',
            fontSize: 20,
        },
        scales: {
            xAxes: [{
              ticks: {            
                   min: 0,
                   max: 100,
                   callback: function(value){return value+ "%"}
                },
            }]
          },
      };
    });