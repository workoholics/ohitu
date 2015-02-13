'use strict';

/**
 * @ngdoc function
 * @name appOhituApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the appOhituApp
 */
angular.module('appOhituApp')
  .controller('ProfileCtrl', function ($scope,restclient,$ionicModal,$route,Utils) {

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
    
  	$scope.change = function(data){
    	$scope.contentManager.change(data);
    	$scope.getScreenData(data.subviewActive);
    };

    /* Get User data*/
    $scope.getUserData = function(){
    	restclient.users.get(
		{},
		function(response){
			$scope.userData = response.content.item;
		},
		function(error){
			console.log('ERROR AL OBTENER DATOS DE USUARIO',error);
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
  
    /* Objeto de cambio de email*/
	$scope.emailChanger = {
		email: '',
		validationMessage: '',
		change: function(){
			var regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         	if(regexEmail.test(this.email)){
				restclient.users.update(
				{email:this.email},
				function(){
					$scope.change($scope.appMap.profileData);
					$scope.getUserData();
					$scope.emailChanger.email = '';
				},
				function(error){
					console.log('ERROR AL CAMBIAR EMAIL',error);
					if(error.status === 401){
		              Utils.relogin(function(){
		                $route.reload();
		              },$scope.redirectToLogin);
		            }
		            else if(error.status === 0)
					{
						$scope.redirectOffline();
					}
		            else
		            {
		            	$scope.emailChanger.validationMessage = $scope.literals.server_error.literal;
		            }
					
				});
			}
			else
			{
				this.validationMessage = $scope.literals.wrong_mail_error.literal;
			}
		}	
	};

	/* Objeto de cambio de conhtraseña*/
	$scope.passChanger = {
		pass: '',
		passrpt: '',
		validationMessage: '',
		change: function(){
			if(this.pass !== '' && this.passrpt !== ''){
				if(this.pass === this.passrpt ){
					if(this.pass.length > 3)
					{
						restclient.users.update(
						{
							password : this.pass
						},
						function(){
							$scope.change($scope.appMap.profileData);
							$scope.getUserData();
							$scope.passChanger.pass = '';
							$scope.passChanger.passrpt = '';
						},
						function(error){
							console.log('ERROR AL CAMBIAR CONTRASEÑA',error);
							if(error.status === 401){
				              Utils.relogin(function(){
				                $route.reload();
				              },$scope.redirectToLogin);
				            }
				            else if(error.status === 0)
							{
								$scope.redirectOffline();
							}
				            else
				            {
								$scope.emailChanger.validationMessage = error.data.content.message;
							}
						});
					}
					else
					{
						this.validationMessage = $scope.literals.length_pass_error.literal;
					}
				}
				else{
					this.validationMessage = $scope.literals.equals_pass_error.literal;
				}
			}
			else{
				this.validationMessage = $scope.literals.empty_pass_error.literal;
			}
		}
	};

	$scope.deleteUser = {
		do: function(){
			restclient.users.delete(
			{},
			function(){
				Utils.deleteSession();
				$route.reload();
			},
			function(error){
				console.log('ERROR AL BORRAR USUARIO',error);
			});
		},
		openConfirmation: function(){
			$scope.openModal();
		},
		closeConfirmation: function(){
			$scope.closeModal();
		}
	};



    /* Get about screen literals*/
    $scope.getScreenData($scope.contentManager.subviewActive);
    $scope.getUserData();


    
});
