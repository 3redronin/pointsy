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
      $scope.game2 = gameFactory.create();
      $scope.game2.addRound();

    });
