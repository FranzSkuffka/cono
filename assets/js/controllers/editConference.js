(function() {
    app.controller(

      "editConferenceController"

       , function(
       // DEPENDENCY INJECTION
          $scope
        , $rootScope
        , $firebaseArray
        , $stateParams
        , $location
        , Auth
        , cloudinary
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


          imageUpload( cloudinary, function(imageData){
              $scope.conference.corporateidentity.logo = imageData;
              try{$scope.$digest();}
              catch (e) {}
            }
          );
        }

        /////////////////////////////////////////
        // UTILITIES TO SCOPE

        $scope.state = $stateParams;
        $scope.toast = Materialize.toast;

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
            $scope.talks.$add(entryTemplates.newTalk($stateParams.id, $scope.conference)).then(function (talk) {
              var path = '/edit/talk/' + talk.key() + '/' + $stateParams.slug + '/' + $stateParams.id
              $location.path(path)
            })
          }


          /////////
          // BIND TRACKS
          $scope.tracks = $firebaseArray(fbRef.child('tracks').orderByChild('conferenceId').equalTo($stateParams.id))

          $scope.$watch('tracks', function (data) {
            $('.TrackList').collapsible()
          });

          // create add track method
          $scope.addTrack = function () {
            $scope.tracks.$add(entryTemplates.newTrack($stateParams, $scope));
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
                    bindUiWidgets();
                }else{
                    $state.go('dashboard');
                }

            });
        }else{
          $state.go('dashboard');
        }


        // SAVE CONFERENCE
        // decide if update or delete

        var clone = function (object) {
          return JSON.parse(JSON.stringify(object));
        }

        $scope.save = function () {
          var conferenceToUpdate = clone($scope.conference)
          Materialize.toast('Konferenz gespeichert.', 1000)
          conferenceToUpdate.start = new Date(conferenceToUpdate.start).getUnixTime();
          conferenceToUpdate.end = new Date(conferenceToUpdate.end).getUnixTime();
          conferenceToUpdate.corporateidentity.color = $('input[name="color"]')[0].value;
          conferenceRef.update(conferenceToUpdate);
        };

        // DELETE
        $scope.removeConference = function() {
            conferenceRef.remove();
            $state.go("dashboard");
        };

        // PUBLISH
        $scope.publish = function() {
            $scope.conference.published = true;
            Materialize.toast('Konferenz veröffentlicht.', 1000, 'blue')
            conferenceRef.update({published: true});
        };

        // UNPUBLISH
        $scope.unpublish = function() {
            $scope.conference.published = false;
            Materialize.toast('Konferenz versteckt.', 1000, 'grey')
            conferenceRef.update({published: false});
        };
        //////////////////////////////////////////

        return $scope;
    });
}).call(this);
