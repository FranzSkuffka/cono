(function() {
  var app;

  app = angular.module("cono", ["firebase"]);

  app.controller("conoController", function($scope, $firebaseArray) {
    var ref;
    ref = new Firebase("project-3091671327564189981.firebaseio.com/");
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
