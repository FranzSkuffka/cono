(function() {
app.controller("dashboardController", function($scope, $firebaseArray, $location) {

  $scope.conferences = $firebaseArray(fbRef.child('conferences').orderByChild('organizerId').equalTo(fbRef.getAuth().uid));
  $scope.user = { // TODO: implement Auth
    ID: 'someUserId'
  };

  $scope.changeView = function(conference){
    var conferencePath = '/edit/' + conference.name + '/' + conference.$id;
    $location.path(conferencePath);
    //console.log(conference.$id);
  }
  
  $scope.createConference = function(conference){
    var createConferencePath = '/edit';
    $location.path(createConferencePath);
    //console.log(conference.$id);
  }

  return $scope;
});
}).call(this);
