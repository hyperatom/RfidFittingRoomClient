'use strict';

/**
 * @ngdoc overview
 * @name rfidFittingRoomClientApp
 * @description
 * # rfidFittingRoomClientApp
 *
 * Main module of the application.
 */
angular
    .module('rfidFittingRoomClientApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'restangular'
    ])
    .config(function ($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .run(function(Restangular, APIBASE) {
        Restangular.setBaseUrl(APIBASE);
    })
    .value('APIBASE', 'http://rfid-fitting-room-server.herokuapp.com/');
