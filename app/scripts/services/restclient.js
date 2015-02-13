'use strict';

/**
 * @ngdoc service
 * @name appOhituApp.restclient
 * @description
 * # restclient
 * Factory in the appOhituApp.
 */
angular.module('appOhituApp')
  .factory('restclient', function ($resource) {



    var baseURL = 'http://api.ohitu.es/api';
	//var baseURL = 'http://test220.irontec.com/ohitu/api';


    // Public API here
    return {
        'login' : $resource(baseURL + '/login',{},{}),
        'users' : $resource(baseURL + '/users',{},
        {
            'update' : {method: 'PUT'}
        }),
        'categories' : $resource(baseURL + '/categories',{},{}),
        'challenges' : $resource(baseURL + '/challenges',{},
        {
            'update' : {method: 'PUT'}
	    }),
        'screens' : $resource(baseURL + '/screens',{},{}),
        'literals' : $resource(baseURL + '/literals',{},{}),
        'recomendations' : $resource(baseURL + '/recomendations',{},{}),
        'challengeregistry' : $resource(baseURL + '/challengeregistry',{},{}),
        'relogin' : $resource(baseURL + '/relogin',{},{}),
        'resetpassword': $resource(baseURL + '/resetpassword',{},{
            'send': {method:'PUT'} 
        })
    };
    
});
