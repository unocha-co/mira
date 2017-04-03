'use strict';

angular.module('koboG')
    .config(function ($stateProvider) {
        $stateProvider.state({
            name: 'home',
            url: '/',
            controller: 'HomeCtrl',
            templateUrl: 'home/home.html'
        });
    })

    .controller('HomeCtrl', function ($scope, apiService) {

        $scope.init = function (){
            $scope.markers = {};
            getData();
            console.log($scope);
        };

        function getData (){
            apiService.api.get('data').then(function (response){
                $scope.surveys = response.data;
                angular.forEach($scope.surveys, function (value,key){
                    $scope.markers[value.borough.name] = {};
                    $scope.markers[value.borough.name].lat = value.borough.lat;
                    $scope.markers[value.borough.name].lng = value.borough.lng;
                    $scope.markers[value.borough.name].message = value.borough.department.name + ' - ' + value.borough.name + '/ ' + value.starting_date +" <a class='label label-info' ui-sref='surveys({id:"+value.id+"})'>Survey</a>";
                });
            });
        }

        


        var mainMarker = {
                lat: 6.33236022397594,
                lng: -75.55709838867188,
                focus: true,
                message: "Antioquia, Bello",
            };

        angular.extend($scope, {
                center: {
                    lat: 6.33236022397594,
                    lng: -75.55709838867188,
                    zoom: 7,
                },
                position: {
                    lat: 51,
                    lng: 0
                },
            });

        $scope.init();
    });