'use strict';

(function () {


  /**
   * @name "GameFactory"
   * @constructor
   */
  var GameFactory =
      function () {
        /**
         * @returns {pointsy.Game}
         */
        this.create = function () {
          return new pointsy.Game();
        };
      };
  angular.module('pointsyApp')
      .service('gameFactory', GameFactory);

})();