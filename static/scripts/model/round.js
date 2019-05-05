'use strict';

window.pointsy = window.pointsy || {};

/**
 * @constructor
 * @param {Number} number The 1-based index of this round relative to others in the same game
 */
pointsy.Round = function (number) {
  this.number = number;
  this.scores = [];
};

pointsy.Round.prototype.addScore = function (playerIndex, totalAmount) {
  this.scores.push({index: playerIndex, total: totalAmount});
};

pointsy.Round.prototype.getTotalScore = function (playerIndex) {
  return this.scores[playerIndex].total;
};

pointsy.Round.prototype.toMemento = function () {
  return { number: this.number, scores: this.scores };
};

pointsy.Round.fromMemento = function (memento) {
  var round = new pointsy.Round(memento.number);
  for (var i = 0; i < memento.scores.length; i++) {
    var score = memento.scores[i];
    round.addScore(score.index, score.total);
  }
  return round;
};
