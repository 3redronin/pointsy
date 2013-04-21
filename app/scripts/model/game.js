'use strict';
window.pointsy = window.pointsy || {};

/**
 * @constructor
 */
pointsy.Game = function () {
  /** @type {String} */
  this.name = "Game";

  /** @type {pointsy.Player[]} */
  this.players = [];
  /** @type {pointsy.Round[]} */
  this.rounds = [];
};

/**
 * @param {pointsy.Player} player
 */
pointsy.Game.prototype.addPlayer = function (player) {
  var index = this.players.length;
  this.players.push(player);
  for (var i = 0; i < this.rounds.length; i++) {
    var round = this.rounds[i];
    round.addScore(index, null);
  }
};

/**
 * @param {pointsy.Round} round
 */
pointsy.Game.prototype.isLast = function (round) {
  return round.number === this.rounds.length;
};

pointsy.Game.prototype.addRound = function () {
  var round = new pointsy.Round(this.rounds.length + 1);
  for (var i = 0; i < this.players.length; i++) {
    round.addScore(i, null);
  }
  this.rounds.push(round);
};

pointsy.Game.prototype.commonDeltas = function (playerIndex) {
  var rounds = this.rounds;
  var lastScore = 0;
  var deltas = [];
  var startIndex = Math.max(0, rounds.length - 4);
  for (var i = startIndex; i < rounds.length; i++) {
    var score = rounds[i].getTotalScore(playerIndex);
    if (score === null) {
      continue;
    }
    var delta = score - lastScore;
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

pointsy.Game.prototype.changeScore = function (currentRound, currentScore, delta) {
  for (var i = currentRound.number - 1; i < this.rounds.length; i++) {
    var round = this.rounds[i];
    var score = round.scores[currentScore.index];
    if (score.total === null) {
      if (currentRound === round) {
        if (i === 0) {
          score.total = delta;
        } else {
          var previousRound = this.rounds[i - 1];
          var previousScore = previousRound.scores[currentScore.index];
          score.total = previousScore.total + delta;
        }
      }
    } else {
      score.total += delta;
    }
  }
};

pointsy.Game.prototype.toMemento = function () {
  var peeps = [];
  for (var i = 0; i < this.players.length; i++) {
    peeps.push(this.players[i].toMemento());
  }
  var rounds = [];
  for (i = 0; i < this.rounds.length; i++) {
    rounds.push(this.rounds[i].toMemento());
  }
  return {
    version: 2,
    name: this.name,
    players: peeps,
    rounds: rounds
  };
};

pointsy.Game.fromMemento = function (memento) {
  var game = new pointsy.Game();
  game.name = memento.name;
  for (var i = 0; i < memento.players.length; i++) {
    var player = pointsy.Player.fromMemento(memento.players[i]);
    game.addPlayer(player);
  }
  for (i = 0; i < memento.rounds.length; i++) {
    var round = pointsy.Round.fromMemento(memento.rounds[i]);
    game.rounds.push(round);
  }
  return game;
};