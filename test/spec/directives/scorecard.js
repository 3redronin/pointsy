'use strict';

describe('Directive: scorecard', function () {
  beforeEach(module('pointsyApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<scorecard></scorecard>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the scorecard directive');
  }));
});
