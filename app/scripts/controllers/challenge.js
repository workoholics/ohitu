'use strict';

/**
 * @ngdoc function
 * @name appOhituApp.controller:  
 * @description
 * # ChallengeListCtrl
 * Controller of the appOhituApp
 */
angular.module('appOhituApp')
  .controller('ChallengeCtrl', function ($scope,Utils,appMap,restclient,DateManager,$ionicModal,$route) {
    

    /* Modal functions */
    $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });


    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
    // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
    // Execute action
    });


    /* Functions */

    var manageChallengesAndCheckFinished = function(response){
      $scope.challengeCollection = response.content.collection;

      /* Organizar retos*/
      for(var i = 0 ; i < $scope.challengeCollection.length; i++){
        var challenge = $scope.challengeCollection[i];
        var finishDate = Utils.calcFinishDate(challenge.creationDate,challenge.objetive);
        if(moment().isAfter(finishDate) && !challenge.finished)
        {
          restclient.challenges.update({id:challenge.id,finished:true},
          function(){
            challenge.finished = true;
            manageChallenges(challenge);
          },
          function(error){
            console.log('ERROR MARCANDO COMO FINALIZADO');
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
        else
        {
          manageChallenges(challenge);
        }
      }

      

    };

    var manageChallenges = function(challenge){
      if(challenge.finished === false && $scope.challengesData.firstChallenge === null){
        /*First challenge*/
        $scope.challengesData.firstChallenge = challenge;
        if(typeof $scope.challengesData.firstChallenge.description === 'string'){
          $scope.challengesData.firstChallenge.description = Utils.splitBreakRow($scope.challengesData.firstChallenge.description);
        }

        getRegistryAndManageDates($scope.challengesData.firstChallenge);
      }
      else{
        /* Active challenges*/
        if(challenge.finished === false){
          $scope.challengesData.activeChallenges.push(challenge);
          if(typeof $scope.challengesData.activeChallenges[$scope.challengesData.activeChallenges.length - 1].description === 'string'){
            $scope.challengesData.activeChallenges[$scope.challengesData.activeChallenges.length - 1].description = Utils.splitBreakRow($scope.challengesData.activeChallenges[$scope.challengesData.activeChallenges.length - 1].description);
          }
          getRegistryAndManageDates($scope.challengesData.activeChallenges[$scope.challengesData.activeChallenges.length - 1]);
          //console.log('Challenge',$scope.challengesData.activeChallenges[$scope.challengesData.activeChallenges.length - 1]);
        }
        /*  Inactive challenges*/
        else{
          $scope.challengesData.inactiveChallenges.push(challenge);
          if(typeof $scope.challengesData.inactiveChallenges[$scope.challengesData.inactiveChallenges.length - 1].description === 'string'){
            $scope.challengesData.inactiveChallenges[$scope.challengesData.inactiveChallenges.length - 1].description = Utils.splitBreakRow($scope.challengesData.inactiveChallenges[$scope.challengesData.inactiveChallenges.length - 1].description);
          }
          getRegistryAndManageDates($scope.challengesData.inactiveChallenges[$scope.challengesData.inactiveChallenges.length - 1]);
        }
      }

    };

    /*Recoge los registros pertenecientes a un reto*/
    var getRegistryAndManageDates = function(challenge){
      restclient.challengeregistry.get(
        { 
          challengeId: challenge.id
        },
        function(response){
          challenge.registry = response.content.collection;
          manageDates(challenge);
        },
        function(error){
          console.log('ERROR OBTENIENDO CHALLENGE REGISTRY',error);
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


    var manageDates = function(challenge){
      challenge.dateManager = new DateManager(challenge);
      challenge.dateManager.attempsEnabled();
    };

    /*Marcar "Hecho" dentro de un reto*/
    $scope.done = function(challenge){
      if(challenge.dateManager.attempsEnabled() > 0 && !challenge.dateManager.todayDone()){
        restclient.challengeregistry.save({
          challengeId : challenge.id,
        },
        function(){
          getRegistryAndManageDates(challenge);
        },
        function(error){
          console.log('ERROR CREANDO REGISTRO DE RETO',error);
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


    /* Metodo para renovar reto */
    $scope.renew = function(challenge,backToList){
      var date = new Date();
      var name = challenge.name.substring(0,challenge.name.length - 13) + Date.parse(date);
      restclient.challenges.save({
        name: name,
        description: challenge.description[0] + '|' + challenge.description[1],
        promise: challenge.promise,
        promisedTo: challenge.promisedTo,
        objetive: challenge.objetive,
        periodicity: challenge.periodicity,
        categoryId: challenge.categoryId
      },
      function(){
        if(backToList)
        {
          $scope.change($scope.appMap.challengeList);
        }
        $scope.challengesData = {firstChallenge: null,activeChallenges: [],inactiveChallenges: [],};
        $scope.getChallenges(manageChallengesAndCheckFinished);
      },
      function(error){
        console.log('ERROR AL CREAR RENOVACIÓN DE RETO');
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

    $scope.deleteChallenge = function(challengeId){
      restclient.challenges.delete({
        id: challengeId
      },
      function(){
        $scope.closeModal();
        $scope.changeToList(appMap.challengeList);
        $scope.challengesData = {firstChallenge: null,activeChallenges: [],inactiveChallenges: [],};
        $scope.getChallenges(manageChallengesAndCheckFinished);
      },
      function(error){
        console.log('ERROR BORRANDO RETOS',error);
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

    /* Cambiar a pagina interior de reto*/
    $scope.changeToInner = function(data,challenge){
      $scope.randomTip = {};
      $scope.innerChallenge = challenge;
      $scope.innerChallenge.dateManager = new DateManager($scope.innerChallenge);
      $scope.contentManager.change(data);
      $scope.getScreenData(data.subviewActive);
      getRandomTip(challenge.categoryId);
    };

    /* Volver de la página interior de reto al listado*/
    $scope.changeToList = function(data){
      $scope.contentManager.change(data);
      $scope.getScreenData(data.subviewActive);
    };

    /* Get categories, con parametro callback success*/
    var getCategories = function(success){
      restclient.categories.get({
      },
      success,
      function(error){
        console.log('ERROR OBTENIENDO CATEGORIA',error);
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

    var getRandomTip = function(catId){
      if(catId !== null){
        $scope.getScreen('Tips',function(responseScreen){

        var currentScreen = responseScreen.content.collection[0];
        restclient.recomendations.get({
            screenId: currentScreen.id,
            categoryId: catId
          },
          function(response){
            var recomendations = response.content.collection;
            if(recomendations.length > 0)
            {
              var index = Math.floor(Math.random() * ((recomendations.length - 1) + 1));
              $scope.randomTip = recomendations[index];
              getCategories(function(response){
                var categories = response.content.collection;
                for(var i = 0; i < categories.length;i++){
                  if(categories[i].id === $scope.randomTip.categoryId){
                    $scope.randomTip.categoryName = categories[i].name;
                    break;
                  }
                }
              });
            }
            else
            {
              getRandomGeneralTip();
            }
          },
          function(error){
            console.log('ERROR AL OBTENER RECOMENDACIONES', error);
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

      }
      else
      {
        getRandomGeneralTip();
      }
    };

    /* Regoge una recomendación de categoria general*/
    var getRandomGeneralTip = function(){
      getCategories(function(response){
        var categories = response.content.collection;
        var category = {};
        for(var i = 0; i < categories.length; i++){
          if(categories[i].name === 'Ohitu'){
            category = categories[i];
            break;
          }
        }
        restclient.recomendations.get({
          categoryId: category.id
        },
        function(response){
          var recomendations = response.content.collection;
          if(recomendations.length > 0)
          {
            var index = Math.floor(Math.random() * ((recomendations.length - 1) + 1));
            $scope.randomTip = recomendations[index];
            $scope.randomTip.categoryName = category.name;
          }
        },
        function(error){
          console.log('ERROR AL OBTENER RECOMENDACIONES',error);
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
    };



    $scope.getScreenData($scope.contentManager.subviewActive);

    /* Datos de los retos para la visualización*/
    $scope.challengesData = {
      firstChallenge: null,
      activeChallenges: [],
      inactiveChallenges: [],
    };

    $scope.getChallenges(manageChallengesAndCheckFinished);





    
});

