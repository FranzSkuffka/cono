(function() {
    app.controller("editConferenceController", function($scope, $firebaseArray, $location, $stateParams) {

        $scope.conferences = $firebaseArray(fbRef.child('conferences'));
        $scope.user = { // TODO: implement Auth
            ID: 'someUserId'
        };



        console.log($stateParams);

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
                    color: "",
                    logo: ""
                }
            }
        };

        if($stateParams.id){
            fbRef.child("conferences/").child($stateParams.id).on('value', function(snapshot) {
                if(snapshot.val() != null){
                    $scope.conference = snapshot.val();
                }else{
                    $scope.conference = newConference();
                }
                console.log(snapshot.val());
            });
        }else{
            $scope.conference = newConference();
        }

        $scope.addConference = function() {
            $scope.conferences.$add({
                name: $scope.conference.name,
                description: $scope.conference.description,
                start: $scope.conference.start,
                end: $scope.conference.end,
                location: {
                    street: $scope.conference.location.street,
                    housenumber: $scope.conference.location.housenumber,
                    zip: $scope.conference.location.zip,
                    city: $scope.conference.location.city
                },
                organizerID: $scope.user.ID,
                corporateidentity: {
                    color: $scope.conference.corporateidentity.color,
                    logo: $scope.conference.corporateidentity.logo
                }
            });
            $location.path("/dashboard");
        };

        $scope.removeConference = function() {
            fbRef.child("conferences/").child($stateParams.id).remove();
            $location.path("/dashboard");
        };

        $scope.backDashboard = function(conference){
          var backDashboardPath = '/';
          $location.path(backDashboardPath);
        }
        
        $scope.goTalk = function(conference){
          //hier richtigen pfad eingeben
          var goTalkPath = '/';
          $location.path(goTalkPath);
        }
        
        $scope.goTrack = function(conference){
          //hier richtigen pfad eingeben
          var goTrackPath = '/';
          $location.path(goTrackPath);
        }

        return $scope;
    });
}).call(this);
