'use strict';

describe('Filter: deltaPrinter', function () {

  // load the filter's module
  beforeEach(module('pointsyApp'));

  // initialize a new instance of the filter before each test
  var deltaPrinter;
  beforeEach(inject(function ($filter) {
    deltaPrinter = $filter('deltaPrinter');
  }));

  it('should return the input prefixed with "+" for positive numbers', function () {
    expect(deltaPrinter(1)).toEqual('+1');
    expect(deltaPrinter(100)).toEqual('+100');
  });

  it('should return the original value as a string for 0 and negative numbers', function () {
    expect(deltaPrinter(0)).toEqual('0');
    expect(deltaPrinter(-1)).toEqual('-1');
  });


});
