(function() {
app.controller("dashboardController", function($scope, $firebaseArray, $location) {

  $scope.conferences = $firebaseArray(fbRef.child('conferences'));
  $scope.user = { // TODO: implement Auth
    ID: 'someUserId'
  };

  $scope.changeView = function(conference){
    var conferencePath = '/edit/' + conference.name + '/' + conference.$id;
    $location.path(conferencePath);
    console.log(conference.$id);
  }

  return $scope;
});
}).call(this);
