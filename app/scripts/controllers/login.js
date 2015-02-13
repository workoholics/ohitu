'use strict';

/**
 * @ngdoc function
 * @name appOhituApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the appOhituApp
 */
angular.module('appOhituApp')
  .controller('LoginController', function ($scope,$location,Utils,appMap,restclient) {
  
    /* ==== Functions ===== */
    var loginRestClientError = function(error){
      if (error.status === 401) {
        $scope.loginValidationMessage = $scope.literals.wrong_pass_usr.literal;
      }
      else if(error.status === 417){
        $scope.loginValidationMessage = $scope.literals.wrong_pass_usr.literal;
      }
      else if(error.status === 0)
      {
        $scope.redirectOffline();
      }
    };

    var newUserRestClientError = function(){
      console.log('ERROR RESTCLIENTE');
      $scope.newUserValidationMessage = $scope.literals.user_exist.literal;
    };

    var redirectWithChallenges = function(response){
      if(response.content.collection.length > 0){
        $scope.contentManager.show($scope.appMap.challenge);
      }
      else{
        $scope.contentManager.show($scope.appMap.firstUseSlider);
      }
    };


    /* -- End -- Functions */


    /*SubView Object*/
    // $scope.subview = {
    //   active: 'start',
    //   //SubView change method
    //   change: function(subview){
    //     this.active = subview;
    //     $scope.getScreenData(subview);
    //   }
    // };

    /* Init */
    $scope.loginValidationMessage = null;
    $scope.newUserValidationMessage = null;
    $scope.forgotValidationMessage = null;

    //$scope.getScreenData('start');



    //Login methods and attributes
    $scope.login = {
      user: '',
      password: '',
      /* do Login */
      do : function (){   
        if(this.user.indexOf('@') !== -1)
        {
          restclient.login.save({
            /*Login data*/
            email: this.user,
            password: this.password,
          },function(response){
            //Success Login
            Utils.createSession(response.content.item);
            $scope.getChallenges(redirectWithChallenges); //Get challenges and redirect
          },loginRestClientError);
        }
        else
        {
          restclient.login.save({
            /*Login data*/
            username : this.user,
            password: this.password,
          },function(response){
            /*Success Login*/
            Utils.createSession(response.content.item);
            $scope.getChallenges(redirectWithChallenges); //Get challenges and redirect
          },loginRestClientError);
        }
      },
      /* Resetear login inputs*/
      reset : function(){
        this.user ='';
        this.password = '';
      }
    };



    //New User methods and attributes
    $scope.newUser = {
      email: '',
      user: '',
      pass: '',
      rptPass: '',
      /* do New User*/
      create : function(){
        /* Create new user if inputs are valid*/
        var user = this.user;
        var pass = this.pass;
        if(this.isValid()){
          restclient.users.save({
            user: this.user,
            email: this.email,
            password: this.pass
          },function(){
            restclient.login.save({
              /*Login data*/
              username: user,
              password: pass,
            },function(response){
              //Success Login
              Utils.createSession(response.content.item);
              $scope.contentManager.show($scope.appMap.firstUseSlider);
            },loginRestClientError);
          },newUserRestClientError);
        }
      },
      isValid : function(){
        var res = false;
        /* Validation empty inputs*/
        if(this.email !== '' && this.user !=='' && this.pass && this.rptPass){
          /* Validation valid email*/
          var regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if(regexEmail.test(this.email)){
            /* Validation user length*/
            if(this.user.length >= 4 && this.user.length <= 60){
              /* Validation password length*/
              if(this.pass.length >= 4){
                /*Validation same passwords*/
                if(this.pass === this.rptPass){
                  return true;
                }
                else{
                  $scope.newUserValidationMessage = $scope.literals.diff_pass_error.literal;
                }
              }
              else{
                $scope.newUserValidationMessage = $scope.literals.length_pass_error.literal;
              }
            }
            else{
              $scope.newUserValidationMessage = $scope.literals.length_user_error.literal;
            }

          }
          else{
            $scope.newUserValidationMessage = $scope.literals.wrong_mail_error.literal;
          }
        }
        else{
          $scope.newUserValidationMessage = $scope.literals.empty_input_error.literal;
        }
        return res;
      },
      reset : function(){
        this.email= '';
        this.user= '';
        this.pass= '';
        this.rptPass= '';
      }

    };
      

    $scope.forgotPassword = {
      email: '',
    	send : function(){
    		// get password by email and send to de user
    		if(this.isValid()){
    			restclient.resetpassword.send({
            email: this.email
          },
          function(){
            $scope.change($scope.appMap.emailSent);
          },
          function(error){
            console.log('ERROR RESETEANDO CONTRASEÑA',error);
            $scope.forgotValidationMessage = $scope.literals.wrong_mail.literal;
          });
    		}
    		else{
    			$scope.forgotValidationMessage = $scope.literals.wrong_mail.literal;
    		}
    	},
    	isValid: function(){
    		var regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var valid = false;
        if(regexEmail.test(this.email)){
          valid = true;
        }
        return valid;
    	},
      reset: function(){
        this.email = '';
      }
    };

    $scope.resetInputs = function(){
      $scope.login.reset();
      $scope.newUser.reset();
      $scope.forgotPassword.reset();
    };
  

    
});

