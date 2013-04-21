'use strict';

describe('Model: pointsy.Person', function () {

  it('creates a player with the given name', function () {
    var player = new pointsy.Player('R. Kelly');
    expect(player.name).toEqual('R. Kelly');
  });

  it('is able to save itself to a memento', function () {
    var player = new pointsy.Player('Whawha');
    expect(player.toMemento()).toEqual({name: 'Whawha'});
  });

  it('is able to restore itself from a memento', function () {
    var memento = {name: 'Whawha'};
    expect(pointsy.Player.fromMemento(memento)).toEqual(new pointsy.Player('Whawha'));
  });

});
