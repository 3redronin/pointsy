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

      var game2 = gameFactory.create();
      game2.addRound();

      $scope.games = [ game, game2 ];

    });
