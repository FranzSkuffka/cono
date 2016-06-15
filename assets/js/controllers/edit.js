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
        // BIND UI WIDGETS
        var bindUiWidgets = function () {

          $('.tabs').tabs()
          $('.materialize-colorpicker').colorpicker(
            {
              component: '.btn'
            }
          )

          materializeCropper(function(imageData){
            $scope.conference.corporateidentity.logo = imageData;
            $scope.$digest();
          })

        }

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
                description: "Mysteriöses Gerede über Lorem ipsum und son Zeug",
                track: null,
                start: new Date().getUnixTime(),
                end: new Date().getUnixTime(),
                location: 'someWhere',
                speaker: 'Someone',
                speakerDescription: 'Someone is really down with some serious issues.',
                speakerPicture: 'http://www.radfaces.com/images/avatars/garth-algar.jpg',
                conferenceId: $stateParams.id
            }
        };

        // new track template
        // used in addTrack()
        var newTrack = function(){
            return {
                name: "New Track",
                conferenceId: $stateParams.id,
                description: "This appears to be a very mysterious place"
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
        var bindTalksAndTracks = function () {
          $scope.talks = $firebaseArray(fbRef.child('talks').orderByChild('conferenceId').equalTo($stateParams.id))

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
          $scope.tracks = $firebaseArray(fbRef.child('tracks').orderByChild('conferenceId').equalTo($stateParams.id))

          $scope.$watch('tracks', function (data) {
            $('.TrackList').collapsible()
            console.log($scope.tracks);
          });

          // create add track method
          $scope.addTrack = function () {
            $scope.tracks.$add(newTrack());
          }
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
                    conference.start = new Date(conference.start * 1000);
                    conference.end = new Date(conference.end * 1000);
                    $scope.conference = conference;
                    $scope.conferenceRef = true;
                    // BIND CHILDREN
                    bindTalksAndTracks();
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
                bindUiWidgets();

            });
        }else{
            $scope.conference = newConference();
            conferenceRef = false;
            bindUiWidgets();
        }


        // SAVE CONFERENCE
        // decide if update or delete

        var clone = function (object) {
          return JSON.parse(JSON.stringify(object));
        }

        $scope.save = function () {

          // if the conferenceRef is defined , update it!
          if(conferenceRef) {
            var conferenceToUpdate = clone($scope.conference)
            conferenceToUpdate.start = new Date(conferenceToUpdate.start).getUnixTime();
            conferenceToUpdate.end = new Date(conferenceToUpdate.end).getUnixTime();
            conferenceRef.update(conferenceToUpdate);
          }

          // if it is, just save it 
          else {
            var conferenceToSave = clone(JSON.stringify($scope.conference))
            conferenceToSave.start = new Date(conferenceToSave.start).getUnixTime();
            conferenceToSave.end = new Date(conferenceToSave.end).getUnixTime();
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
