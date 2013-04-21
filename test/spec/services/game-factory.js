'use strict';

describe('Service: gameFactory', function () {

  // load the service's module
  beforeEach(module('pointsyApp'));

  // instantiate service
  var gameFactory;
  beforeEach(inject(function (_gameFactory_) {
    gameFactory = _gameFactory_;
  }));

  it('creates unique game instances', function () {
    var game = gameFactory.create();
    expect(game).toBeDefined();
    var anotherGame = gameFactory.create();
    expect(game).not.toBe(anotherGame);
  });


  it('creates a game with no rounds', function () {
    var game = gameFactory.create();
    expect(game.rounds.length).toBe(0);
    expect(game.players.length).toBe(0);
  });

});
