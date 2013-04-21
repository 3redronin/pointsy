'use strict';

describe('Model: pointsy.Game', function () {

  /** @type {pointsy.Game} */
  var game;
  beforeEach(function () {
    game = new pointsy.Game();
  });

  it('creates a game with no rounds and no players', function () {
    expect(game.rounds.length).toBe(0);
    expect(game.players.length).toBe(0);
  });

  function addPlayer(name) {
    game.addPlayer(new pointsy.Player(name));
  }

  function addWhaWhaAndDaniel() {
    addPlayer('WhaWha');
    addPlayer('Daniel');
  }

  it('saves players to an array and back-fills previous scores as null', function () {
    addWhaWhaAndDaniel();
    expect(game.players).toEqual([new pointsy.Player('WhaWha'), new pointsy.Player('Daniel')]);
    game.addRound();
    addPlayer('Frank');
    expect(game.rounds[0].getTotalScore(2)).toBeNull();
  });

  it('creates an object to hold scores for each player', function () {
    addWhaWhaAndDaniel();
    game.addRound();
    expect(game.rounds[0].number).toEqual(1);
    expect(game.rounds[0].scores).toEqual([
      {index: 0, total: null},
      {index: 1, total: null}
    ]);
  });

  it('is able to round trip itself to a memento', function () {
    addWhaWhaAndDaniel();
    game.addRound();
    game.rounds[0].scores[0].total = 10;
    game.rounds[0].scores[1].total = 15;
    addPlayer('Jack');
    game.addRound();
    game.rounds[1].scores[2].total = 10;

    var memento = game.toMemento();
    expect(pointsy.Game.fromMemento(memento)).toEqual(game);
  });

});
