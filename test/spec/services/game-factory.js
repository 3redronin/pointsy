'use strict';

describe('Service: gameFactory', function () {

  // load the service's module
  beforeEach(module('pointsyApp'));

  // instantiate service
  var gameFactory;
  /** @type Game */
  var game;
  beforeEach(inject(function (_gameFactory_) {
    gameFactory = _gameFactory_;
    game = _gameFactory_.create();
  }));

  it('should do create a game with no rounds and no players', function () {
    expect(game.rounds.length).toBe(0);
    expect(game.players.length).toBe(0);

  });

});
