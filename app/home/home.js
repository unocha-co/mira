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

    .controller('HomeCtrl', [function () {

    }]);