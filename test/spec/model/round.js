'use strict';

describe('Model: pointsy.Round', function () {

  /** @type {pointsy.Round} */
  var round;
  beforeEach(function () {
    round = new pointsy.Round(1);
  });

  it('creates a round with an index and no scores', function () {
    expect(round.number).toBe(1);
    expect(round.scores.length).toBe(0);
  });

  it('returns scores that are added to it', function () {
    round.addScore(0, 10);
    round.addScore(1, 15);
    expect(round.getTotalScore(0)).toEqual(10);
    expect(round.getTotalScore(1)).toEqual(15);
  });

  it('is able to save itself to a memento', function () {
    round.addScore(0, 10);
    round.addScore(1, null);
    var expected = {
      number: 1,
      scores: [
        {index: 0, total:10}, {index:1, total: null}
      ]
    };
    expect(round.toMemento()).toEqual(expected);
  });

  it('is able to restore itself from a memento', function () {
    round.addScore(0, 10);
    round.addScore(1, null);

    var memento = {
      number: 1,
      scores: [
        {index: 0, total:10}, {index:1, total: null}
      ]
    };

    expect(pointsy.Round.fromMemento(memento)).toEqual(round);
  });

});
