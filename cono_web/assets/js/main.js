(function() {
  var app;

  app = angular.module("cono", ["firebase"]);

  app.controller("dashboardController", function($scope, $firebaseArray) {

    var ref = new Firebase("project-3091671327564189981.firebaseio.com/");

    $scope.conferences = $firebaseArray(ref.child('conferences'));
    $scope.user = { // TODO: implement Auth
      ID: 'someUserId'
    }

    $scope.addConference = function() {
      return $scope.conferences.$add({
        name: 'New Conference',
        description: 'This is a great conference',
        end: new Date(),
        address: {
          city: 'Wherever',
          houseNumber: '10a',
          street: 'next turn left',
          zip: 12345,
          organizerID: $scope.user.ID
        }
      });
    };
    $scope.removeConference = function(conference) {
      return $scope.conferences.$remove(conference);
    }

    return $scope;
  });

}).call(this);
