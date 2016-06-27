// EDIT TALKS
 (function() {
    app.controller(

      "editTalkController"

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

        // UTILITY: MERGE DATE AND TIME
        //
        var mergeTimestamp = function (date, time) {
          return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 
             time.getHours(), time.getMinutes(), time.getSeconds());
        }

        // LOAD TALK FROM DATABASE
        if($stateParams.id){
            // add return link to scope
            var returnPath = '/edit/' + $stateParams.conferenceName + '/' + $stateParams.conferenceId;
            $scope.returnPath = '/#' + returnPath

          /////////
          // BIND TRACKS
          fbRef.child('tracks').orderByChild('conferenceId').equalTo($stateParams.conferenceId).once('value', function(snapshot) {
            $scope.tracks = snapshot.val();
            setTimeout(function(){$('select').material_select()}, 100);
          });


            var talksRef = fbRef.child("talks/")
            var conferenceRef = fbRef.child("conferences/").child($stateParams.conferenceId)
            var talkRef = talksRef.child($stateParams.id)

            talkRef.once('value', function(snapshot) {
                if(snapshot.val() != null){
                    var talk = snapshot.val();
                    // talk.date = new Date();
                    talk.date = new Date(talk.start * 1000);
                    talk.start = new Date(talk.start * 1000);
                    talk.end = new Date(talk.end * 1000);
                    $scope.talk = talk;
                    // save db entry id for saving
                    try{ // lil hack i'm lazy right now
                         // and this whole thing is a hack anyways
                      $scope.$digest()
                    }
                    catch (e) {};
                    imageUpload(cloudinary, function(imageData){
                      $scope.talk.speakerPicture = imageData;
                      try {$scope.$digest()}
                      catch (e) {}
                    });
                }else{
                    talkRef = false;
                    imageUpload(cloudinary, function(imageData){
                      $scope.talk.speakerPicture = imageData;
                      try {$scope.$digest()}
                      catch (e) {}
                    });
                }
            });
        }else{
            $state.go('dashboard');
        }

        $scope.save = function () {
          // combine date and times
          $scope.talk.start = mergeTimestamp($scope.talk.date, $scope.talk.start).getUnixTime()
          $scope.talk.end = mergeTimestamp($scope.talk.date, $scope.talk.end).getUnixTime()
          console.log($scope.talk.end)
          // delete date property
          delete $scope.talk.date
          // delete date property
          talkRef.update($scope.talk)
          Materialize.toast('Talk gespeichert', 1000, 'green')
        }

        $scope.return = function () {
          // go back to conference
          $location.path(returnPath);
        }

        $scope.new = function () {
          // go back to conference
          Materialize.toast('Neuer Talk wird erstellt', 1000, 'grey')
          conferenceRef.once('value', function(snapshot) {
            var conference = snapshot.val()
            var newTalk = talksRef.push()
            newTalk.set(entryTemplates.newTalk($stateParams.conferenceId, conference))
            var newPath = '/edit/talk/' + newTalk.key() + '/' + $stateParams.conferenceName + '/' + $stateParams.conferenceId;
            $location.path(newPath);

          })
        }

      var firebaseRef = fbRef
    });
}).call(this);
