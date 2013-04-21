'use strict';


describe('Service: gameFactory with native browser support', function () {
  // load the service's module
  beforeEach(module('pointsyApp'));
  // instantiate service
  var gameFactory;
  beforeEach(inject(function ($injector, _gameFactory_) {
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

  it('is able to store and retrieve an array of games', function () {
    var game1 = gameFactory.create();
    game1.addPlayer(new pointsy.Player('Frank'));
    var game2 = gameFactory.create();
    game2.addPlayer(new pointsy.Player('Blonk'));
    gameFactory.saveGames([game1, game2]);
    var restored = gameFactory.loadGames();
    expect(restored).toEqual([game1, game2]);
  });

});

describe('Service: gameFactory for old browsers', function () {

  // load the service's module
  beforeEach(module('pointsyApp'));

  var mockWindow = { /** no localStorage is declared on window on old browsers */ };
  beforeEach(module(function ($provide) {
    $provide.value('$window', mockWindow);
  }));
  // instantiate service
  var gameFactory;
  beforeEach(inject(function ($injector, _gameFactory_) {
    gameFactory = _gameFactory_;
  }));

  function addSomeGames() {
    var game1 = gameFactory.create();
    game1.addPlayer(new pointsy.Player('Frank'));
    var game2 = gameFactory.create();
    game2.addPlayer(new pointsy.Player('Blonk'));
    gameFactory.saveGames([game1, game2]);
  }

  it('does not throw exceptions when native storage unavailable', function () {
    addSomeGames();
    gameFactory.loadGames();
  });

  it('returns an empty array when local storage is not supported', function () {
    addSomeGames();
    expect(gameFactory.loadGames()).toEqual([]);
  });

});
