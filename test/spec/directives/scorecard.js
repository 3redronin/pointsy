'use strict';

describe('Directive: scorecard', function () {
  beforeEach(module('pointsyApp'));

  var element, scope;

  it('Put a game variable on the scope', inject(function ($rootScope, $compile) {
    element = angular.element('<scorecard></scorecard>');
    scope = $rootScope.$new();
    element = $compile(element)(scope);
    expect(scope.game).not.toBeNull();
  }));
});
