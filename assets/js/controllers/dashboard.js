(function() {
app.controller("dashboardController", function($scope, $firebaseArray, $location) {

    var conferencesRef = fbRef.child('conferences')

    // new conference template
    // used on load error
    var newConference = function(){
        return {
            name: "",
            description: "",
            start: new Date(),
            end: new Date(),
            location: {
                street: "",
                housenumber: "",
                zip: "",
                city: ""
            },

            corporateidentity: {
                color: "rgb(252,255,255)",
                logo: ""
            },

            published: false,
            // Insert creator ID
            organizerId: fbRef.getAuth().uid

        }
    };


  $scope.conferences = $firebaseArray(fbRef.child('conferences').orderByChild('organizerId').equalTo(fbRef.getAuth().uid));
  $scope.user = { // TODO: implement Auth
    ID: 'someUserId'
  };

  $scope.changeView = function(conference){
    var conferencePath = '/edit/' + conference.name + '/' + conference.$id;
    $location.path(conferencePath);
    //console.log(conference.$id);
  }
  
  $scope.createConference = function(){
      var conferenceToSave = newConference()
      conferenceToSave.start = new Date(conferenceToSave.start).getUnixTime();
      conferenceToSave.end = new Date(conferenceToSave.end).getUnixTime();
      conferencesRef.push(conferenceToSave);
  }

  return $scope;
});
}).call(this);
