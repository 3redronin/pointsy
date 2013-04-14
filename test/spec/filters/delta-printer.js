'use strict';

describe('Filter: deltaPrinter', function () {

  // load the filter's module
  beforeEach(module('pointsyApp'));

  // initialize a new instance of the filter before each test
  var deltaPrinter;
  beforeEach(inject(function ($filter) {
    deltaPrinter = $filter('deltaPrinter');
  }));

  it('should return the input prefixed with "deltaPrinter filter:"', function () {
    var text = 'angularjs';
    expect(deltaPrinter(text)).toBe('deltaPrinter filter: ' + text);
  });

});
