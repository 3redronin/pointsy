'use strict';

angular.module('pointsyApp')
    .controller('MainCtrl',
    /**
     *
     * @param $scope
     * @param {GameFactory} gameFactory
     */
    function ($scope, gameFactory) {
      var game = gameFactory.create();

      game.addPlayer("Whawha");
      game.addPlayer("Daniel");
      game.addRound();

      $scope.game = game;

      $scope.addRoundIfNeeded = function (round) {
        if (round.isLast()) {
          game.addRound();
        }
        return true;
      };

      $scope.changeScore = function (round, score, delta) {
        game.changeScore(round, score, delta);
        $scope.addRoundIfNeeded(round);
      };

      $scope.addPlayer = function () {
        var name = $scope.newPlayer.trim();
        if (name) {
          game.addPlayer(name);
        }
        $scope.newPlayer = "";
      };

    });
