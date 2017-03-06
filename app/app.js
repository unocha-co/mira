'use strict';

// Declare app level module which depends on views, and components
angular.module('koboG', [
    'ui.router',
    'myApp.version',
    'ui.bootstrap',
    'chart.js',
]).config(function ($locationProvider, $urlRouterProvider) {
    $locationProvider.hashPrefix('!');
    $urlRouterProvider.otherwise('/');
});
