'use strict';

angular.module('pointsyApp').service('gameFactory',
    /**
     * @param {ng.$window} $window
     */
    function ($window) {

      /** @type {Storage} */
      var storer = $window.localStorage;

      /**
       * @returns {pointsy.Game}
       */
      this.create = function () {
        return new pointsy.Game();
      };
      /**
       * @param {pointsy.Game[]} games
       */
      this.saveGames = function (games) {
        if (!storer) {
          return [];
        }
        var mementos = [];
        for (var i = 0; i < games.length; i++) {
          mementos.push(games[i].toMemento());
        }
        storer.setItem('games', JSON.stringify(mementos));
      };

      this.loadGames = function () {
        if (!storer) {
          return [];
        }

        var raw = storer.getItem('games');
        if (!raw) {
          return [];
        }
        var mementos = JSON.parse(raw);
        var games = [];
        for (var i = 0; i < mementos.length; i++) {
          var memento = mementos[i];
          games.push(pointsy.Game.fromMemento(memento));
        }
        return games;
      };
    });

