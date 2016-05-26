(function() {
app.controller("authController", ['$scope', '$state', 'Auth', function($scope, $state, Auth) {

  $scope.login = function () {
      if ($scope.user.email && $scope.user.pwd) {
          Auth.$authWithPassword({
              email: $scope.user.email,
              password: $scope.user.pwd
          }).then(function (authData) { // SUCCESS
              console.log("Logged in as:" + authData.uid);
              $state.go('dashboard');
          }).catch(function (error) {
              alert("Authentication failed:" + error.message);
          });
      } else
          alert("Please enter email and password both");
  };

  $scope.register = function () {
      console.log("Create User Function called");
      if ($scope.user.email && $scope.user.pwd) {

          Auth.$createUser({
              email: $scope.user.email,
              password: $scope.user.pwd
          }).then(function (userData) {
              alert("User created successfully!");

              fbRef.child("/hosts").child(userData.uid).set({
                  email: $scope.user.email
              });
          }).catch(function (error) {
              alert("Error: " + error);
          });
      } else
          alert("Please fill all details");
  };

}]);
}).call(this);
