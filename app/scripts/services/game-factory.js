'use strict';

(function () {
  /**
   * @constructor
   */
  var Game = function () {
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
      };
      for (var i = 0; i < me.players.length; i++) {
        round.scores.push({index: i, total: null});
      }
      this.rounds.push(round);
      round.isLast = function () {
        return round.number === me.rounds.length;
      };
      round.commonDeltas = function (scoreIndex) {
        var lastScore = { index: -1, total: 0 };
        var deltas = [];
        var startIndex = Math.max(0, me.rounds.length - 4);
        for (var i = startIndex; i < me.rounds.length; i++) {
          var round = me.rounds[i];
          var score = round.scores[scoreIndex];
          if (score.total === null) {
            continue;
          }
          var delta = score.total - lastScore.total;
          if (deltas.indexOf(delta) === -1) {
            deltas.push(delta);
          }
          lastScore = score;
        }

        if (deltas.length === 0) {
          deltas = [-1, 0, 1];
        } else if (deltas.length === 1) {
          if (deltas.indexOf(0) === -1) {
            deltas.push(0);
          } else if (deltas.indexOf(1) === -1) {
            deltas.push(1);
          }
        } else {
        }
        deltas.sort();

        return deltas;
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
        if (score.total === null) {
          if (currentRound === round) {
            if (i === 0) {
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

  /**
   * @constructor
   */
  var GameFactory =
      function () {
        /**
         * @returns {Game}
         */
        this.create = function () {
          return new Game();
        };
      };
  angular.module('pointsyApp')
      .service('gameFactory', GameFactory);

})();