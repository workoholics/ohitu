'use strict';

describe('Service: fixedLiterals', function () {

  // load the service's module
  beforeEach(module('appOhituApp'));

  // instantiate service
  var fixedLiterals;
  beforeEach(inject(function (_fixedLiterals_) {
    fixedLiterals = _fixedLiterals_;
  }));

  it('should do something', function () {
    expect(!!fixedLiterals).toBe(true);
  });

});
