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

            var talkRef = fbRef.child("talks/").child($stateParams.id)
            talkRef.once('value', function(snapshot) {
                if(snapshot.val() != null){
                    var talk = snapshot.val();
                    // talk.date = new Date();
                    talk.date = new Date(talk.start);
                    talk.start = new Date(talk.start);
                    talk.end = new Date(talk.end);
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
          $scope.talk.start = mergeTimestamp($scope.talk.date, $scope.talk.start)
          $scope.talk.end = mergeTimestamp($scope.talk.date, $scope.talk.end)
          // delete date property
          delete $scope.talk.date
          // delete date property
          talkRef.update($scope.talk)
          // go back to conference
          $location.path(returnPath);
        }
            var talkRef = fbRef.child("talks/").child($stateParams.id)

    }]);
}).call(this);
