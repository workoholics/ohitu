'use strict';

/**
 * @ngdoc overview
 * @name appOhituApp
 * @description
 * # appOhituApp
 *
 * Main module of the application.
 */
angular
  .module('appOhituApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ionic'
  ])
  .config(['$routeProvider','$httpProvider',function ($routeProvider, $httpProvider) {



    $httpProvider.defaults.useXDomain = true;

    $httpProvider.defaults.withCredentials = true;

    
    $httpProvider.interceptors.push(function($q) {
  
      var numLoadings = 0;

      return {
        request: function (config) {

            numLoadings++;
            var loader = document.getElementsByClassName('loader');
            if(loader.length > 0){
              loader[0].style.display = 'inherit';
            }
            return config || $q.when(config)
            
        },
        response: function (response) {

            if ((--numLoadings) === 0) {
                // Show loader
                var loader = document.getElementsByClassName('loader');
                if(loader.length > 0){
                  loader[0].style.display = 'none';
                }
            }

            return response || $q.when(response);

        },
        responseError: function (response) {

            if (!(--numLoadings)) {
                // Hide loader
                var loader = document.getElementsByClassName('loader');
                if(loader.length > 0){
                  loader[0].style.display = 'none';
                }
            }

            return $q.reject(response);
        }
      };

    });

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });



   

  }],function($sceDelegateProvider) {

    $sceDelegateProvider.resourceUrlWhitelist(['.*']);



  });


