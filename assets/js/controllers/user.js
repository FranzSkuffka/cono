(function() {
  app.controller("userController", ['$scope', '$scope', '$state', 'Auth', function($scope, $rootScope, $state, Auth) {

    $rootScope.$on('$stateChangeStart', 
    function(event, toState, toParams, fromState, fromParams){
        if (toState.name == 'edit' || toState.name == 'new')
          $scope.canGoHome = true;
        else
          $scope.canGoHome = false;
        // do something
    })

    // on login
    Auth.$onAuth(function(authData) {

      // put user data in scope
      if(authData != null){
        fbRef.child("organizers/").child(authData.uid).on('value', function(snapshot) {
          $scope.userData = snapshot.val();
          $scope.$digest();
        });
      }
      else
        $scope.userData = false;

      // supply logout function
      $scope.logout = function() {
        Auth.$unauth();
        $state.go('login');
      };

    });
  }]);
}).call(this);
