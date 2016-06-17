(function() {
app.controller("authController", ['$scope', '$state', 'Auth', function($scope, $state, Auth) {


  if($state.current.name == 'logout') {
    Auth.$unauth();
    Materialize.toast('Abgemeldet', 5000, 'grey white-text')
    $state.go('login');
  }

  $scope.user = {}
  $scope.login = function () {
      if ($scope.user.email && $scope.user.pwd) {
          Materialize.toast('Anmelden...', 2000)
          Auth.$authWithPassword({
              email: $scope.user.email,
              password: $scope.user.pwd
          }).then(function (authData) { // SUCCESS
              Materialize.toast('Angemeldet', 2000, 'green white-text')
              $state.go('dashboard');
          }).catch(function (error) {
              Materialize.toast('Anmeldung fehlgeschlagen', 5000, 'red white-text')
          });
      } else
          Materialize.toast('Bitte gib Email und Passwort ein', 2000, 'orange white-text')
  };

}]);
}).call(this);
