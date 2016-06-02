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

        // LOAD TALK FROM DATABASE
        if($stateParams.id){
            // add return link to scope
            returnPath = '/edit/' + $stateParams.conferenceName + '/' + $stateParams.conferenceId;
            $scope.returnPath = '/#' + returnPath
            console.log($scope.returnPath);

            var talkRef = fbRef.child("talks/").child($stateParams.id)
            talkRef.once('value', function(snapshot) {
                console.log(snapshot.val())
                if(snapshot.val() != null){
                    var talk = snapshot.val();
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
          console.log($scope.talk);
          $location.path($scope.returnPath);
        }

    }]);
}).call(this);
