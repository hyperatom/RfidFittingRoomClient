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
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
