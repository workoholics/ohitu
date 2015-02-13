'use strict';

/**
 * @ngdoc function
 * @name appOhituApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appOhituApp
 */
angular.module('appOhituApp')
  .controller('MainCtrl', function ($scope,$route,Utils,appMap,restclient,fixedLiterals) {


  	
  	/* Functions */

  	/*$scope.change = function(data){
		$scope.contentManager.show(data);
		getScreenData(data.key);
	};*/

	$scope.getLiterals = function(screen){
		restclient.literals.get(
		  {
		    screenId:screen.id
		  },function(response){
		    //console.log("LITERALS", response.content.collection);
		    var literals = response.content.collection;

		    $scope.literals = {};

		    for( var i = 0; i < literals.length; i++)
		    {
		      var literal = literals.filter( function(item){return (item.name===literals[i].name);} );
		      $scope.literals[literals[i].name] = literal[0];
		    }
		},
		function(error){
			console.log('ERROR OBTENIENDO LITERALES',error);
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

	$scope.getScreen = function(screen,success){
		restclient.screens.get(
			{
				name:screen
			},
			success,
			function(error){
				console.log('ERROR GETTING SCREEN',error);
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



	$scope.getScreenData = function(screen){
		$scope.getScreen(screen,function(response){
			$scope.screen = response.content.collection[0];
			//console.log("SCREENS", response.content.collection[0]);
			$scope.getLiterals($scope.screen);
		});
	};

	/* Método para cambiar de subview*/
	$scope.change = function(appMapData,optionalFunc){
		if(typeof appMapData === 'object')
		{
			$scope.contentManager.change(appMapData);
			$scope.getScreenData(appMapData.subviewActive);
		}
		else
		{
			$scope.contentManager.change(appMap[appMapData]);
			$scope.getScreenData(appMapData);
		}

		if(optionalFunc !== null && optionalFunc !== undefined){
			optionalFunc();
		}

		
	};

	/* Redirect to login view*/
	$scope.redirectToLogin = function(){
		Utils.deleteSession();
		$scope.contentManager.show($scope.appMap.login);
	};

	/* Reload app with new session*/
	$scope.reloadWithSession = function(response){
		Utils.createSession(response.content.item);
		$route.reload();
	};

	/* Get challenges*/
	$scope.getChallenges = function(success){
      restclient.challenges.get({},
        success,
        function(error){
          	console.log('ERROR OBTENIENDO RETOS',error);
          	if(error.status === 401){
				Utils.relogin(
					$scope.reloadWithSession,
					$scope.redirectToLogin
				);
			}
			else if(error.status === 0)
			{
				$scope.redirectOffline();
			}
        });
    };


	/*Session logout*/
	$scope.logout = function(){
		restclient.login.delete({},
		function(){
			$scope.emptyChallengeCollection();
			Utils.deleteSession();
			$scope.contentManager.show($scope.appMap.login);
		},
		function(error){
          	console.log('ERROR OBTENIENDO RETOS',error);
          	if(error.status === 401){
				Utils.relogin(
					$scope.reloadWithSession,
					$scope.redirectToLogin
				);
			}
			else if(error.status === 0)
			{
				$scope.redirectOffline();
			}
        });
	};

	/*Delete challenges from data model*/
	$scope.emptyChallengeCollection = function(){
		$scope.challengeCollection = {};
	};


	/*Redirect offline*/
	$scope.redirectOffline = function(){
		$scope.online = false;
		$scope.contentManager.show($scope.appMap.login);
	};

	$scope.reload = function(){
		$route.reload();
	};


	
  	/* -- End Functions */

  	/* online var*/
  	$scope.online = true;

  	/* Mapa de la app*/
  	$scope.appMap = appMap;

  	/*Fixed literals*/
  	$scope.fixedLiterals = fixedLiterals.eu;

  	// if($scope.checkConnection()){
  	// 	$scope.init();
  	// }
  	// else{
  	// 	$scope.redirectOffline();
  	// }
  	

	
	/* Comprobación de sesión*/
  	if(Utils.sessionExist()){
  		$scope.contentManager = Utils.getContentManager(appMap.challenge);
  	}
  	else{
  		$scope.contentManager = Utils.getContentManager(appMap.login);
  	}


  	

  	/* Obtener literales del menú*/
  	$scope.getScreen('menu',function(response){
  		var screen = response.content.collection[0];
  		restclient.literals.get(
  		{
  			screenId: screen.id
  		},
  		function(response){
  			var literals = response.content.collection;

		    $scope.menuLiterals = {};

		    for( var i = 0; i < literals.length; i++)
		    {
		      var literal = literals.filter( function(item){return (item.name===literals[i].name);} );
		      $scope.menuLiterals[literals[i].name] = literal[0];
		    }
  			
  		},
  		function(error){
  			console.log('ERROR AL OBTENER LITERALES DEL MENÚ',error);
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
  	});
		/* -- end -- Obtener literales del menú*/

  	

  	


  	
	

	


  	
	//$scope.contentManager = Utils.getContentManager(appMap.challengeList);

	





});
