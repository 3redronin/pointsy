'use strict';

angular.module('pointsyApp')
    .filter('deltaPrinter', function () {
      return function (input) {
        return input > 0 ? "+" + input : input;
      };
    });
