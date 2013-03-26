'use strict';

angular.module('pointsyApp')
    .controller('MainCtrl', function ($scope) {

      $scope.players = [ "Whawha", "Daniel"];

      $scope.rounds = [
          [10, 5],
          [10, 6],
          [15, 8]
      ];


    });
