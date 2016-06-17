(function() {
app.controller("registrationController", ['$scope', '$state', 'Auth', function($scope, $state, Auth) {
  $scope.newUser = {};
  $scope.newUser.name = '';
  $scope.newUser.email = '';
  $scope.newUser.pwd = '';
  $scope.newUser.pwdRepeat = '';

  $scope.register = function () {
      if ($scope.newUser.email && $scope.newUser.pwd && $scope.newUser.pwdRepeat) {
            if ($scope.newUser.pwd == $scope.newUser.pwdRepeat) {
              Materialize.toast('Erstelle deinen Account...', 5000);
              Auth.$createUser({
                  email: $scope.newUser.email,
                  password: $scope.newUser.pwd
              }).then(function (userData) {
                  fbRef.child("/organizers").child(userData.uid).set({
                      email: $scope.newUser.email,
                      name: $scope.newUser.name
                  });
                  Materialize.toast('Du bist registriert, ' + $scope.newUser.name + '.Willkommen bei Cono!', 5000, 'green');
                  $state.go('login')
              }).catch(function (error) {
                  Materialize.toast('Da ist was schief gegangen. Versuch es nochmal!', 5000, 'red')
              });
        } else
          Materialize.toast('Die Passwörter stimmen nicht überein.', 5000, 'orange')
      } else
        Materialize.toast('Bitte fülle alle Felder richtig aus.', 5000, 'orange')
  };

  $scope.user = {}
  $scope.resetPassword = function () {
      if ($scope.user.email) {
            console.log(fbRef, Auth);
            Auth.$resetPassword({
                email: $scope.user.email
            }).then(function (userData) {
                Materialize.toast('Passwort verschickt!', 5000, 'green', $state.go('login'))

            }).catch(function (error) {
                Materialize.toast('Da ist was schief gegangen. Prüf deine Adresse und versuch es nochmal!', 5000, 'red')
              });
      } else
        Materialize.toast('Bitte gib deine Email Adresse ein.', 5000, 'orange')
  };

}]);
}).call(this);
