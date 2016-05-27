(function() {
app.controller("settingsController", ['$scope', '$state', 'Auth', function($scope, $state, Auth) {
  $scope.user = {};
  $scope.user.name = '';
  $scope.user.email = '';
  $scope.user.pwd = '';
  $scope.user.pwdRepeat = '';

  $scope.changePwd = function () {
      console.log("Change Pwd Function called");
      if ($scope.user.oldPwd && $scope.user.pwd && $scope.user.pwdRepeat) {
        console.log('all data is supplied');

        if ($scope.user.pwd == $scope.user.pwdRepeat) {
          console.log('all passwords are equal');
          fbRef.changePassword({
            email: $scope.user.email,
            oldPassword: $scope.user.oldPwd,
            newPassword: $scope.user.pwd
          }, function(error) {
            if (error) {
              switch (error.code) {
                case "INVALID_PASSWORD":
                  alert("The specified user account password is incorrect.");
                  break;
                case "INVALID_USER":
                  alert("The specified user account does not exist.");
                  break;
                default:
                  console.log("Error changing password:", error);
              }
            } else {
              console.log("User password changed successfully!");
            }
          });
        } else
          $scope.message = 'Passwords do not match';
      } else
        $scope.message = 'Please fill all details and a valid password';
  };

}]);
}).call(this);
