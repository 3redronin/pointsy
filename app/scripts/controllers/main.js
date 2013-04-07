'use strict';

var pointsy = pointsy || {};

pointsy.Game = function () {
  var me = this;
  this.players = [];
  this.rounds = [];
  this.addPlayer = function (name) {
    var index = this.players.length;
    this.players.push(name);
    for (var i = 0; i < me.rounds.length; i++) {
      var round = me.rounds[i];
      round.scores.push({index: index, total: null});
    }
  };
  this.addRound = function () {
    var round = {
      number: this.rounds.length + 1,
      scores: []
    }
    for (var i = 0; i < me.players.length; i++) {
      round.scores.push({index: i, total: null});
    }
    this.rounds.push(round);
    round.isLast = function () {
      return round.number === me.rounds.length;
    };
  };
  this.setScore = function (roundIndex, playerIndex, score) {
    while (roundIndex >= this.rounds.length) {
      this.addRound();
    }
    var round = this.rounds[roundIndex];
    round.scores[playerIndex] = {index: playerIndex, total: score};
  };
  this.changeScore = function (currentRound, currentScore, delta) {
    for (var i = currentRound.number - 1; i < me.rounds.length; i++) {
      var round = me.rounds[i];
      var score = round.scores[currentScore.index];
      if (score.total == null) {
        if (currentRound == round) {
          if (i == 0) {
            score.total = delta;
          } else {
            var previousRound = me.rounds[i - 1];
            var previousScore = previousRound.scores[currentScore.index];
            score.total = previousScore.total + delta;
          }
        }
      } else {
        score.total += delta;
      }
    }
  };
};

angular.module('pointsyApp')
    .controller('MainCtrl', function ($scope) {

      var game = new pointsy.Game();
      game.addPlayer("Whawha");
      game.addPlayer("Daniel");
      game.setScore(0, 0, 10);
      game.setScore(0, 1, 15);
      game.setScore(1, 0, 10);
      game.setScore(1, 1, 25);
      game.addRound();

      $scope.players = game.players;

      $scope.playerCount = function () {
        return $scope.players.length;
      };

      $scope.rounds = game.rounds;

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

angular.module('pointsyApp').
    filter('deltaPrint', function () {
      return function (input) {
        return input > 0 ? "+" + input : input;
      };
    })