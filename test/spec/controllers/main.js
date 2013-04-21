'use strict';

describe('Controller: MainCtrl with nothing saved', function () {

  // load the controller's module
  beforeEach(module('pointsyApp'));

  var MainCtrl, scope, gameFactory;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    gameFactory = {
      loadGames: jasmine.createSpy().andReturn([]),
      saveGames: jasmine.createSpy()
    };
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      gameFactory: gameFactory
    });
  }));

  it('should attach new game with sample players if none were previously saved', function () {
    expect(scope.games.length).toBe(1);
    var game = scope.games[0];
    var expected = new pointsy.Game();
    expected.addPlayer(new pointsy.Player('Player one'));
    expected.addPlayer(new pointsy.Player('Player two'));
    expected.addRound();
    expect(game).toEqual(expected);
  });

  it('should save games when something changes', function () {
    var game = scope.games[0];
    scope.$apply(game.addPlayer('New Player'));
    expect(gameFactory.saveGames).toHaveBeenCalledWith(scope.games);
  });

  it('adding a game inserts it at the top of the list with no players', function () {
    var oldFirstGame = scope.games[0];
    scope.addGame();
    expect(scope.games[1]).toBe(oldFirstGame);
    var expectedNewGame = new pointsy.Game();
    expectedNewGame.name = "Game 2";
    expectedNewGame.addRound();
    expect(scope.games[0]).toEqual(expectedNewGame);
  });

});

describe('Controller: MainCtrl with at least one game saved', function () {

  // load the controller's module
  beforeEach(module('pointsyApp'));

  var MainCtrl, scope, gameFactory;
  var game1 = new pointsy.Game();
  var game2 = new pointsy.Game();

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    gameFactory = {
      loadGames: jasmine.createSpy().andReturn([game1, game2])
    };
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      gameFactory: gameFactory
    });
  }));

  it('should attach previously saved games to the scope', function () {
    expect(scope.games.length).toBe(2);
    expect(scope.games[0]).toBe(game1);
    expect(scope.games[1]).toBe(game2);
  });
});
