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

    .controller('HomeCtrl', function ($scope, apiService, $state) {

        $scope.init = function () {
            var tilesDict = {
                openstreetmap: {
                    url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                    options: {
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    }
                },
                opencyclemap: {
                    url: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
                    options: {
                        attribution: 'All maps &copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, map data &copy; <a href="http://www.openstreetmap.org">OpenStreetMap</a> (<a href="http://www.openstreetmap.org/copyright">ODbL</a>'
                    }
                }
            };
            $scope.markers = [];
            getData();
            angular.extend($scope, {
                center: {
                    lat: 4.22765,
                    lng: -72.85448,
                    zoom: 5
                },
                position: {
                    lat: 51,
                    lng: 0
                },
                tiles: tilesDict.opencyclemap,
                maxbounds: {
                    northEast: {
                        lat: -5.61598,
                        lng: -84.375
                    },
                    southWest: {
                        lat: 16.095,
                        lng: -61.875
                    }
                }
            });
        };

        $scope.selectedMarker = function (item, model, label, event) {
            //console.log(item);
            $state.go("surveys", {id: item.id});
        };

        function getData() {
            apiService.api.get('data').then(function (response) {
                $scope.surveys = response.data;
                angular.forEach($scope.surveys, function (value, key) {
                    var mark = {};
                    mark.lat = value.borough.lat;
                    mark.lng = value.borough.lng;
                    mark.id = value.id;
                    mark.message = value.borough.department.name + ' - ' + value.borough.name + '/ ' + value.starting_date + " <a style='color:white;' class='label label-info' ui-sref='surveys({id:" + value.id + "})'>Ver Resultados</a>";
                    mark.title = value.borough.department.name + ' - ' + value.borough.name + '/ ' + value.starting_date;
                    $scope.markers.push(mark);
                });
            });
        }


        $scope.init();
    });