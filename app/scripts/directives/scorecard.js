'use strict';

angular.module('pointsyApp')
  .directive('scorecard', function () {
    return {
      template: '<form>\n  <div>\n    New player:\n    <input type="text" ng-model="newPlayer">\n    <input type="submit" ng-click="addPlayer()">\n  </div>\n</form>\n<form>\n  <table>\n    <thead>\n    <tr>\n      <th></th>\n      <th ng-repeat="player in game.players">{{player}}</th>\n    </tr>\n    </thead>\n    <tbody>\n    <tr ng-repeat="round in game.rounds" ng-model="round">\n      <td>{{round.number}}</td>\n      <td ng-repeat="score in round.scores" class="score">\n        <div ng-show="score.total == null">\n          <span ng-repeat="delta in round.commonDeltas(score.index)" class="deltaPanel">\n            <button ng-click="changeScore(round, score, delta)">{{delta | deltaPrinter}}</button>\n          </span>\n        </div>\n        <input type="number" ng-model="score.total"\n               ng-change="addRoundIfNeeded(round)">\n      </td>\n    </tr>\n    </tbody>\n  </table>\n</form>\n',
      restrict: 'E',
      scope: {
        game: '='
      },
      controller: [ '$scope', function ($scope) {
        var game = $scope.game;
        $scope.addRoundIfNeeded = function (round) {
          if (round.isLast()) {
            game.addRound();
          }
          return true;
        };

        $scope.changeScore = function (round, score, delta) {
          game.changeScore(round, score, delta);
          $scope.addRoundIfNeeded(round);
        };

        $scope.addPlayer = function () {
          var name = $scope.newPlayer.trim();
          if (name) {
            game.addPlayer(name);
          }
          $scope.newPlayer = '';
        };
      }]
    };
  });
