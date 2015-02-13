'use strict';

/**
 * @ngdoc function
 * @name appOhituApp.controller:FirstusesliderCtrl
 * @description
 * # FirstusesliderCtrl
 * Controller of the appOhituApp
 */
angular.module('appOhituApp')
  .controller('firstUseSlider', function ($scope) {
    /* Get about screen literals*/
    $scope.getScreenData($scope.contentManager.key);
  });
