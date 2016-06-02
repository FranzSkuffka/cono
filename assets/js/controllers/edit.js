(function() {
    app.controller(

      "editConferenceController"

       // DEPENDENCY INJECTION CALLS
       // Our controller needs the following things to work...
       , ['$scope'
       , '$rootScope'
       , '$firebaseArray'
       , '$stateParams'
       , 'Auth'
       , '$state'

       , function(
       // DEPENDENCY INJECTION RECEPTION
       // And keeps their names as they are.
                    $scope
                  , $rootScope
                  , $firebaseArray
                  , $stateParams
                  , Auth
                  , $state) {

        /////////////////////////////////////////
        // Make params available in scope
        $scope.state = $stateParams

        /////////////////////////////////////////
        // TEMPLATES FOR NEW ENTRIES

        // new conference template
        // used on load error
        var newConference = function(){
            return {
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
                    color: "black",
                    logo: ""
                },

                published: false,
                // Insert creator ID
                organizerId: fbRef.getAuth().uid

            }
        };

        // new talk template
        // used in addTalk()
        var newTalk = function(){
            return {
                name: "New Talk",
                description: "Mysteriöses Gerede",
                track: "-trackId",
                start: new Date(),
                end: new Date(),
                location: 'someWhere',
                speaker: 'Someone',
                speakerPicture: 'Someone',
                conferenceId: $stateParams.id
            }
        };

        // new track template
        // used in addTrack()
        var newTrack = function(){
            return {
                name: "New Track",
                conferenceId: $stateParams.id,
                description: "This appears to be a very mysterious place",
                talks: ['-some-id']
            }
        };

        ///////////////////////////////////////////

        ///////////////////////////////////////////
        // DATABASE BINDINGS
        //

        // set up references
        conferencesRef = fbRef.child('conferences');


        /////////
        // BIND TALKS
        $scope.talks = $firebaseArray(fbRef.child('talks'))

        // bind material ui
        $scope.$watch('talks', function (data) {
          $('.TalkList').collapsible()
        });

        // create add talk method
        $scope.addTalk = function () {
          $scope.talks.$add(newTalk());
        }


        /////////
        // BIND TRACKS
        $scope.tracks = $firebaseArray(fbRef.child('tracks'))

        $scope.$watch('tracks', function (data) {
          $('.TrackList').collapsible()
        });

        // create add track method
        $scope.addTrack = function () {
          $scope.tracks.$add(newTrack());
        }

        // LOAD CONFERENCE FROM DATABASE
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
                /////////////////////////////////////////
                // BIND UI TABS

                $('.tabs').tabs()

            });
        }else{
            $scope.conference = newConference();
            conferenceRef = false;
            /////////////////////////////////////////
            // BIND UI TABS

            $('.tabs').tabs()
        }

        // SAVE CONFERENCE
        // decide if update or delete

        $scope.save = function () {

          // if the conferenceRef is defined , update it!
          if(conferenceRef) {
            var conferenceToUpdate = $scope.conference
            conferenceToUpdate.start = new Date(conferenceToUpdate.start);
            conferenceToUpdate.end = new Date(conferenceToUpdate.end);
            conferenceRef.update(conferenceToUpdate);
          }

          // if it is, just save it 
          else {
            var conferenceToSave = $scope.conference
            conferenceToSave.start = new Date(conferenceToSave.start);
            conferenceToSave.end = new Date(conferenceToSave.end);
            conferencesRef.push(conferenceToSave);
          }

          $state.go('dashboard');

        };

        // DELETE
        $scope.removeConference = function() {
            conferenceRef.remove();
            $state.go("dashboard");
        };

        // PUBLISH
        $scope.publish = function() {
            $scope.conference.published = true;
            conferenceRef.update({published: true});
        };

        // UNPUBLISH
        $scope.unpublish = function() {
            $scope.conference.published = false;
            conferenceRef.update({published: false});
        };

        //////////////////////////////////////////

        return $scope;
    }]);
}).call(this);
