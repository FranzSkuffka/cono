(function() {
app.controller("registrationController", ['$scope', '$state', 'Auth', function($scope, $state, Auth) {
  $scope.newUser = {};
  $scope.newUser.name = '';
  $scope.newUser.email = '';
  $scope.newUser.pwd = '';
  $scope.newUser.pwdRepeat = '';

  $scope.register = function () {
      console.log("Create User Function called");
      if ($scope.newUser.email && $scope.newUser.pwd && $scope.newUser.pwdRepeat) {
              console.log('all data is supplied');

            if ($scope.newUser.pwd == $scope.newUser.pwdRepeat) {
              console.log('all passwords are equal');

              Auth.$createUser({
                  email: $scope.newUser.email,
                  password: $scope.newUser.pwd
              }).then(function (userData) {
                  console.log("User created successfully!");

                  fbRef.child("/organizers").child(userData.uid).set({
                      email: $scope.newUser.email,
                      name: $scope.newUser.name
                  });
                  $state.go('login');
              }).catch(function (error) {
                  alert();
                  $scope.message = "Error: " + error;
              });
        } else
          $scope.message = 'Passwords do not match';
      } else
        $scope.message = 'Please fill all details and a valid password';
  };

}]);
}).call(this);
