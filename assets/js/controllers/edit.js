(function() {
    app.controller("editConferenceController", ['$scope', '$firebaseArray', '$stateParams', 'Auth', '$state', function($scope, $firebaseArray, $stateParams, Auth, $state) {

        conferencesRef = fbRef.child('conferences');
        $scope.user = { // TODO: implement Auth
            ID: 'someUserId'
        };




        // new conference template
        var newConference = function(){
            return {
                description: "",
                start: "",
                end: "",
                location: {
                    street: "",
                    housenumber: "",
                    zip: "",
                    city: ""
                },
                organizerID: "",
                corporateidentity: {
                    color: "black",
                    logo: ""
                }
            }
        };

        // if there is an ID given through the path, try to load from ID
        // otherwise or if it fails, load the new conference templte
        var conferenceRef = null;
        if($stateParams.id){
            var conferenceRef = fbRef.child("conferences/").child($stateParams.id)
            conferenceRef.once('value', function(snapshot) {
                if(snapshot.val() != null){
                    var conference = snapshot.val();
                    conference.start = new Date(conference.start);
                    conference.end = new Date(conference.end);
                    $scope.conference = conference;
                    $scope.conferenceRef = true;
                    // save db entry id for saving
                    try{ // lil hack i'm lazy right now
                         // and this whole thing is a hack anyways
                      $scope.$digest()
                    }
                    catch (e) {};
                }else{
                    $scope.conference = newConference();
                    conferenceRef = false;
                }
            });
        }else{
            $scope.conference = newConference();
            conferenceRef = false;
        }

        formatDates = function (conference) {
          conference.start = new Date(conference.start);
          conference.end = new Date(conference.end);
          return conference;
        }

        // Save conference
        // decide if update or delete

        $scope.save = function () {

          // if the conferenceRef is not false, update it!
          if(conferenceRef) {
            conferenceRef.update(formatDates($scope.conference));
          }
          else
            conferencesRef.push(formatDates($scope.conference));

          $state.go('dashboard');

        };

        $scope.removeConference = function() {
            conferenceRef.remove();
            $state.go("dashboard");
        };


        return $scope;
    }]);
}).call(this);
(function() {
    app.controller("editTalkController", ['$scope', '$firebaseArray', '$stateParams', 'Auth', '$state', function($scope, $firebaseArray, $stateParams, Auth, $state) {}]);
    app.controller("editTrackController", ['$scope', '$firebaseArray', '$stateParams', 'Auth', '$state', function($scope, $firebaseArray, $stateParams, Auth, $state) {}]);
}).call(this);
