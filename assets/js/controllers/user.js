(function() {
  app.controller("userController", ['$scope', '$state', 'Auth', function($scope, $state, Auth) {

    // on login
    Auth.$onAuth(function(authData) {

      // put user data in scope
      if(authData != null)
        fbRef.child("organizers/").child(authData.uid).on('value', function(snapshot) {
          $scope.userData = snapshot.val();
        });
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
