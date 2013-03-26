'use strict';

angular.module('pointsyApp')
    .controller('MainCtrl', function ($scope) {

      $scope.players = [ "Whawha", "Daniel"];

      $scope.playerCount = function () {
        return $scope.players.length;
      };

      $scope.rounds = [
        { number: 1, scores: [ 10, 5] },
        { number: 2, scores: [ 10, 6] },
        { number: 3, scores: [ 15, 8] }
      ];

      $scope.saveRoundScore = function () {
        console.log($scope, "scope: change: ", $scope.changeAmount);
      };


    });
