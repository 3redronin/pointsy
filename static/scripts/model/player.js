'use strict';

window.pointsy = window.pointsy || {};

/**
 * @constructor
 * @param {String} name
 */
pointsy.Player = function (name) {
  this.name = name;
};

pointsy.Player.prototype.toMemento = function () {
  return { name: this.name };
};

pointsy.Player.fromMemento = function (memento) {
  return new pointsy.Player(memento.name);
};
