'use strict';

/**
 * @ngdoc function
 * @name appOhituApp.controller:ChallengeCtrl
 * @description
 * # ChallengeCtrl
 * Controller of the appOhituApp
 */

angular.module('appOhituApp').controller('ChallengeNewCtrl', function($scope,$route,Utils,restclient){


	/* ------- GET DATA ------- */


	/*Recoge las recomen*/
	var getTargetRecomendations = function(){
		restclient.categories.get(
			{},
			function(response){
				var categories = response.content.collection;
				for(var i = 0; i < categories.length; i++){
					getTargetRecomendationsByCategory(categories[i]);
				}
			},
			function(error){
				console.log('ERROR AL OBTENER CATEGORIAS',error);
				if(error.status === 401){
					Utils.relogin(function(){
						$route.reload();
					},$scope.redirectToLogin);
				}
				else if(error.status === 0)
				{
					$scope.redirectOffline();
				}
			}
		);
	};

	/* Recoge las recomendaciones de la categoria pasada como parametro*/
	var getTargetRecomendationsByCategory = function(category){
		restclient.recomendations.get({
			screenId: $scope.screen.id,
			categoryId: category.id
		},
		function(response){
			if(response.content.collection.length > 0)
			{
				var item = {category : {id: category.id,name : category.name},items:response.content.collection};
				$scope.targetRecomendations.push(item);
			}
			
		},	
		function (error){
			console.log('ERROR OBTENIENDO RECOMENDACIONES POR CATEGORIA',error);
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

	/* Recoge las frecuencias posibles para la selección*/
	var getRecomendations = function(screen){
		restclient.screens.get({
			name:screen
		},
		function(response){
			var screenId = response.content.collection[0].id;
			restclient.recomendations.get({
				screenId : screenId
			},
			function(response){
				switch (screen){
					case 'challengeNewPer': {
						$scope.currencyRecomendations = response.content.collection;
					}
					break;
					case 'challengeNewLength':{
						$scope.lengthRecomendations = response.content.collection;
					}
					break;
					case 'challengeNewPromise':{
						$scope.promiseRecomendations = response.content.collection;
					}
					break;
				}
				//$scope.currencyRecomendations = response.content.collection;
				//console.log('FRECUENCIAS',$scope.lengthRecomendations);
			},
			function(error){
				console.log('ERROR AL OBTENER FRECUENCIAS');
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
		},
		function(error){
			console.log('ERROR AL OBTENER screenId --> challengeNewPer');
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


 	/* Checkear uno de los items de la lista por id de objetivo*/
	$scope.checkTargetItem = function(id,category){
		if($scope.newChallenge.customTarget){
			$scope.newChallenge.customTarget = false;
			$scope.otherChallenge.text = '';
		}
		for(var i = 0; i < $scope.targetRecomendations.length; i++){
			for(var j = 0; j < $scope.targetRecomendations[i].items.length; j++){
				if(id === $scope.targetRecomendations[i].items[j].id){
					//Se checkea visualmente la elección de la recomendación
					$scope.targetRecomendations[i].items[j].checked = true;
					//Se le asigna la descripción de la recomendacion como objetivo del nuevo reto
					$scope.newChallenge.target.name = $scope.targetRecomendations[i].items[j].name;
					$scope.newChallenge.target.text = $scope.targetRecomendations[i].items[j].description;
					$scope.newChallenge.categoryId = category.id;
				}
				else{
					//Se descheckea visualmente la elección de la recomendación
					$scope.targetRecomendations[i].items[j].checked = false;	
				}
			}
		}
	};


	/* Limpia todos los checkboxes de objetivo */
	$scope.clearTargetCheckboxes = function(){
		for(var i = 0; i < $scope.targetRecomendations.length; i++){
			for(var j = 0; j < $scope.targetRecomendations[i].items.length; j++){
				$scope.targetRecomendations[i].items[j].checked = false;
			}
		}
	};

	/* Introducción de un objetivo propio*/
	$scope.selectCustomTarget = function(){
		if(!$scope.newChallenge.customTarget){
			$scope.clearTargetCheckboxes();
			$scope.newChallenge.customTarget = true;
			$scope.newChallenge.categoryId = null;
		}
		$scope.newChallenge.target.name = $scope.newChallenge.target.text = $scope.otherChallenge.text;
	};

	/* Chechear uno de los items de la lista por Frecuencia*/
	$scope.checkCurrencyItem = function(id){
		for( var i = 0; i < $scope.currencyRecomendations.length; i++){
			if(id === $scope.currencyRecomendations[i].id){
				//Se checkea visualmente la elección de la recomendación
				$scope.currencyRecomendations[i].checked = true;
				//Se le asigna la descripción de la recomendacion como objetivo del nuevo reto
				$scope.newChallenge.currency.name = $scope.currencyRecomendations[i].name;
				$scope.newChallenge.currency.text = $scope.currencyRecomendations[i].description;

				if($scope.newChallenge.currency.name === 'always'){
					$scope.twentyOneEnabled = true;
				}
				else{
					$scope.twentyOneEnabled = false;
				}

				//console.log('SELECTED CURRENCY',$scope.newChallenge.currency);
			}
			else{
				//Se descheckea visualmente la elección de la recomendación
				$scope.currencyRecomendations[i].checked = false;	
			}
		}
	};

	/* Chechear uno de los items de la lista por Longitud de tiempo*/
	$scope.checkLengthItem = function(id){
		for( var i = 0; i < $scope.lengthRecomendations.length; i++){
			if(id === $scope.lengthRecomendations[i].id){
				//Se checkea visualmente la elección de la recomendación
				$scope.lengthRecomendations[i].checked = true;
				//Se le asigna la descripción de la recomendacion como objetivo del nuevo reto
				$scope.newChallenge.timeLength.name = $scope.lengthRecomendations[i].name;
				$scope.newChallenge.timeLength.text = $scope.lengthRecomendations[i].description;
				//console.log('SELECTED LENGTH',$scope.newChallenge.currency);
			}
			else{
				//Se descheckea visualmente la elección de la recomendación
				$scope.lengthRecomendations[i].checked = false;	
			}
		}
	};

	/* Chechear uno de los items de la lista por Longitud de tiempo*/
	$scope.checkPromiseItem = function(id){
		if($scope.newChallenge.customPromise){
			$scope.newChallenge.customPromise = false;
			$scope.otherPromise.text = '';
		}
		for( var i = 0; i < $scope.promiseRecomendations.length; i++){
			if(id === $scope.promiseRecomendations[i].id){
				//Se checkea visualmente la elección de la recomendación
				$scope.promiseRecomendations[i].checked = true;
				//Se le asigna la descripción de la recomendacion como objetivo del nuevo reto
				$scope.newChallenge.promise.name = $scope.promiseRecomendations[i].name;
				$scope.newChallenge.promise.text = $scope.promiseRecomendations[i].description;
				//console.log('SELECTED PROMISE',$scope.newChallenge);
			}
			else{
				//Se descheckea visualmente la elección de la recomendación
				$scope.promiseRecomendations[i].checked = false;	
			}
		}
	};

	/* Limpia todos los checkboxes de objetivo */
	$scope.clearPromiseCheckboxes = function(){
		for(var i = 0; i < $scope.promiseRecomendations.length; i++){
			$scope.promiseRecomendations[i].checked = false;
		}
	};

	/* Introducción de un objetivo propio*/
	$scope.selectCustomPromise = function(){
		if(!$scope.newChallenge.customPromise){
			$scope.clearPromiseCheckboxes();
			$scope.newChallenge.customPromise = true;
		}
		$scope.newChallenge.promise.name = $scope.otherPromise.text;
		$scope.newChallenge.promise.text = $scope.otherPromise.text;
	};


    $scope.getScreenData('challengeNewTarget');


	/* Data model para recomendaciones*/
	$scope.targetRecomendations = [];
	$scope.currencyRecomendations = [];
	$scope.lengthRecomendations = [];
	$scope.promiseRecomendations = [];
	$scope.otherChallenge = {text:''};
	$scope.otherPromise = {text:''};

	/* Data model para nuevo reto*/
	$scope.newChallenge = {
		target:{name: '',text: ''},
		currency:{name: '',text: ''},
		timeLength:{name:'',text:''},
		promise:{name: '',text: ''},
		customTarget: false,
		customPromise: false,
		challengeText: '',
		categoryId: null,
		/* Create challenge */
		create: function(){
			//Create challenge text
			this.challengeText = this.promise.text + ' zin egiten diot hurrengo erronka: |' + this.target.text + ', ' + this.currency.text.toLowerCase() + ', ' + this.timeLength.text.toLowerCase();
			
			//New date
			var date = new Date();

			//Insert challenge in ddbb
			restclient.challenges.save({
				name: this.target.name + Date.parse(date),
				description: this.challengeText,
				promise: this.target.text,
				promisedTo: this.promise.name,
				objetive: this.timeLength.name,
				periodicity: this.currency.name,
				categoryId: this.categoryId
			},
			function(){
				$scope.contentManager.show($scope.appMap.challenge);
			},
			function (error){
				console.log('ERROR CREATING CHALLENGE',error);
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


		}
	};
	 
	$scope.getScreen($scope.appMap.challengeNew.subviewActive, function(response){
		//Recoge los literales e info de la pantalla
		$scope.screen = response.content.collection[0];
		//$scope.getLiterals($scope.screen.id);
		//Recoge los datos de las recomendaciones
		getTargetRecomendations();
		getRecomendations('challengeNewPer');
		getRecomendations('challengeNewLength');
		getRecomendations('challengeNewPromise');
	});


	
});