(function() {
    app.controller("editConferenceController", function($scope, $firebaseArray, $location) {

        $scope.conferences = $firebaseArray(fbRef.child('conferences'));
        $scope.user = { // TODO: implement Auth
            ID: 'someUserId'
        };

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

        $scope.go = function(){
            $location.path("/dashboard");
        };

        $scope.newConference = newConference();

        $scope.addConference = function() {
            $scope.conferences.$add({
                name: $scope.newConference.name,
                description: $scope.newConference.description,
                start: $scope.newConference.start,
                end: $scope.newConference.end,
                location: {
                    street: $scope.newConference.location.street,
                    housenumber: $scope.newConference.location.housenumber,
                    zip: $scope.newConference.location.zip,
                    city: $scope.newConference.location.city
                },
                organizerID: $scope.user.ID,
                corporateidentity: {
                    color: $scope.newConference.corporateidentity.color,
                    logo: $scope.newConference.corporateidentity.logo
                }
            });
            $scope.newConference = newConference();
            $scope.go();

        };
        $scope.removeConference = function(conference) {
            return $scope.conferences.$remove(conference);
        };



        return $scope;
    });
}).call(this);
