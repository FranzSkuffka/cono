(function() {
  var app;

  console.log('hey maya');

  app = angular.module("cono", ["firebase"]);

  app.controller("conoController", function($scope, $firebaseArray) {
    var ref;
    ref = new Firebase("dazzling-inferno-1538.firebaseio.com");
    $scope.talks = $firebaseArray(ref);
    return $scope.addTalk = function() {
      return $scope.talks.$add({
        name: $scope.newTalkName,
        speaker: $scope.newTalkSpeaker,
        time: $scope.newTalkTime
      }, $scope.newTalkName = '', $scope.newTalkSpeaker = '', $scope.newTalkTime = '');
    };
  });

}).call(this);
