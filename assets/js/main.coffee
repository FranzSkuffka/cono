console.log 'hey maya'
app = angular.module("cono", ["firebase"])


app.controller "conoController", ($scope, $firebaseArray) ->
  ref = new Firebase("dazzling-inferno-1538.firebaseio.com")

  $scope.talks = $firebaseArray ref

  $scope.addTalk = ->
    $scope.talks.$add
      name: $scope.newTalkName
      speaker: $scope.newTalkSpeaker
      time: $scope.newTalkTime

      $scope.newTalkName = ''
      $scope.newTalkSpeaker = ''
      $scope.newTalkTime = ''

