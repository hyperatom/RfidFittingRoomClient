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
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ngSails'
    ])
    .config(function ($routeProvider, $sailsProvider) {

        $sailsProvider.url = 'http://rfid-fitting-room-server.herokuapp.com:80/';
        //$sailsProvider.url = 'http://127.0.0.1:1337/';

        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
