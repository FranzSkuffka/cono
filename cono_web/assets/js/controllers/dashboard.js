(function() {
app.controller("dashboardController", function($scope, $firebaseArray) {

  $scope.conferences = $firebaseArray(fbRef.child('conferences'));
  $scope.user = { // TODO: implement Auth
    ID: 'someUserId'
  };

  $scope.removeConference = function(conference) {
    return $scope.conferences.$remove(conference);
  };

  return $scope;
});
}).call(this);
