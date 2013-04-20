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

  it('creates a game with no rounds and no players', function () {
    expect(game.rounds.length).toBe(0);
    expect(game.players.length).toBe(0);
  });

  function addWhaWhaAndDaniel() {
    game.addPlayer('WhaWha');
    game.addPlayer('Daniel');
  }

  it('saves player names to an array', function () {
    addWhaWhaAndDaniel();
    expect(game.players).toEqual(['WhaWha', 'Daniel']);
  });

  it('creates an object to hold scores for each player', function () {
    addWhaWhaAndDaniel();
    game.addRound();
    expect(game.rounds[0].number).toEqual(1);
    expect(game.rounds[0].scores).toEqual([{index: 0, total: null}, {index: 1, total: null}]);
  });

});
