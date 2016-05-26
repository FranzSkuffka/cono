(function() {
  app.controller("userController", ['$scope', '$state', 'Auth', function($scope, $state, Auth) {

    // put user data in scope
    Auth.$onAuth(function(authData) {
      $scope.authData = authData;
      $scope.logout = function() {
        Auth.$unauth();
        $state.go('login');
      };

    });
  }]);
}).call(this);
