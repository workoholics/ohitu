'use strict';

describe('Controller: FirstusesliderCtrl', function () {

  // load the controller's module
  beforeEach(module('appOhituApp'));

  var FirstusesliderCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FirstusesliderCtrl = $controller('FirstusesliderCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
