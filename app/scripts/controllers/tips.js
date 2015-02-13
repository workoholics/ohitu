'use strict';

/**
 * @ngdoc function
 * @name appOhituApp.controller:TipsCtrl
 * @description
 * # TipsCtrl
 * Controller of the appOhituApp
 */
angular.module('appOhituApp')
  .controller('TipsCtrl', function ($scope,restclient,Utils,$route) {

  	var getTips = function(screenData){
  		var screenId = screenData.content.collection[0].id;
  		restclient.recomendations.get(
  		{
  			screenId: screenId
  		},
  		function(response){
  			var recomendations = response.content.collection;
        recomendations = recomendations.sort(function() {return Math.random() - 0.5;});
  			for(var i = 0; i < recomendations.length; i++){
  				manageRecomendation(recomendations[i]);
  			}

  		},
  		function(error){
  			console.log('ERROR OBTENIENDO TIPS',error);
        if(error.status === 401){
          Utils.relogin(function(){
            $route.reload();
          },$scope.redirectToLogin);
        }
        else if(error.status === 0)
        {
          $scope.redirectOffline();
        }
  		});
  	};

  	var manageRecomendation = function(recomendation){
  		restclient.categories.get(
  		{},
  		function(response){
  			var item = {};
  			item.description = recomendation.description;
  			item.category = 'Sin categoria';
  			var categories = response.content.collection;
  			for(var i = 0; i < categories.length; i++){
  				if(categories[i].id === recomendation.categoryId){
  					item.category = categories[i].name;
  					break;
  				}
  			}
  			$scope.tips.push(item);
  		},
  		function(error){
  			console.log('ERROR OBTENIENDO CATEGORIAS',error);
        if(error.status === 401){
          Utils.relogin(function(){
            $route.reload();
          },$scope.redirectToLogin);
        }
        else if(error.status === 0)
        {
          $scope.redirectOffline();
        }
  		});
  	};



    $scope.getScreenData($scope.contentManager.key);

    $scope.tips = [];

    $scope.getScreen($scope.contentManager.key,getTips);


  });
