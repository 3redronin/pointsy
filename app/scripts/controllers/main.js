'use strict';

angular.module('pointsyApp')
    .controller('MainCtrl',
    /**
     * @param $scope
     * @param {GameFactory} gameFactory
     */
    function ($scope, gameFactory) {
      var games = gameFactory.loadGames();
      if (games.length === 0) {
        var game = new pointsy.Game();
        game.addPlayer(new pointsy.Player('Player one'));
        game.addPlayer(new pointsy.Player('Player two'));
        game.addRound();
        games.push(game);
      }
      $scope.games = games;
      $scope.$watch('games', function () {
        gameFactory.saveGames(games);
      }, true);

      $scope.addGame = function () {
        var newGame = new pointsy.Game();
        newGame.name = 'Game ' + ($scope.games.length + 1);
        newGame.addRound();
        $scope.games.unshift(newGame);
      };
    });
