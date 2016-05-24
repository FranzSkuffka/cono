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
        name: 'Beyond Tellerrand',
        description: 'Super crazy awesome front end conference',
        end: new Date(),
        location: {
          city: 'Berlin',
          houseNumber: '12',
          street: 'Admiralspalast',
          zip: 10625,
          organizerID: $scope.user.ID
        },
        start: "This is a timestamp",
        end: "This is also a timestamp",
        corporateidentity: {
          color: "blue",
          logo: "logo.png"
        }
      });
    };
    $scope.removeConference = function(conference) {
      return $scope.conferences.$remove(conference);
    }

    return $scope;
  });

}).call(this);
