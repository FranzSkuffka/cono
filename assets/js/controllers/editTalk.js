// EDIT TALKS
 (function() {
    app.controller(

      "editTalkController"

       // DEPENDENCY INJECTION CALLS
       // Our controller needs the following things to work...
       , ['$scope'
       , '$rootScope'
       , '$firebaseArray'
       , '$stateParams'
       , '$location'
       , 'Auth'
       , '$state'

       , function(
       // DEPENDENCY INJECTION RECEPTION
       // And keeps their names as they are.
                    $scope
                  , $rootScope
                  , $firebaseArray
                  , $stateParams
                  , $location
                  , Auth
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
            $scope.tracks['null'] = {
              name: 'No track'
            }
            setTimeout(function(){$('select').material_select()}, 100);
          });


            var talkRef = fbRef.child("talks/").child($stateParams.id)
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
                }else{
                    $scope.talk = newConference();
                    talkRef = false;
                }
            });
        }else{
            // $state.go('dashboard');
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
          // go back to conference
          $location.path(returnPath);
        }

      var firebaseRef = fbRef

      function handleFileSelect(evt) {
        var f = evt.target.files[0];
        var reader = new FileReader();
        reader.onload = (function(theFile) {
          return function(e) {
            var filePayload = e.target.result;

            // Generate a location that can't be guessed using the file's contents and a random number

            $('#CropModal').openModal();

            cropper.croppie('bind', {url: filePayload, points: [0,0,0,0]});

            $('#SaveImage').on('click', function () {

              cropper.croppie('result', {
                type: 'canvas',
                size: {width: 100, height: 100},
                quality: .8
              }).then( function (result) {
                $scope.talk.speakerPicture = result;
                $scope.$digest()
                $('#CropModal').closeModal();
              })
            })
          };
        })(f);
        reader.readAsDataURL(f);
      }


      cropper = $('#croppie').croppie({
        viewport: {
          width: 115,
          height: 115
        }
      });


      $(".file-upload")[0].addEventListener('change', handleFileSelect, false);

    }]);
}).call(this);
