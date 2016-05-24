        starter.controller('SessionCtrl', function ($scope, $state, $firebaseAuth, $ionicLoading, $rootScope) {

            var ref = new Firebase(firebaseUrl);
            var auth = $firebaseAuth(ref);

            $scope.logout = function () {
                // get User, if null, not logged in: var user = ref.getAuth()
                ref.unauth();
                $state.go('login');
            };

            // Perform the login action when the user submits the login form
            $scope.doLogin = function (user) {
                if (user && user.email && user.pwdForLogin) {
                    $ionicLoading.show({
                        template: 'Signing In...'
                    });
                    auth.$authWithPassword({
                        email: user.email,
                        password: user.pwdForLogin
                    }).then(function (authData) {
                        console.log("Logged in as:" + authData.uid);
                        ref.child("users").child(authData.uid).once('value', function (snapshot) {
                            var val = snapshot.val();

                            // To Update AngularJS $scope either use $apply or $timeout
                            $scope.$apply(function () {
                                $rootScope.displayName = val;
                            });
                        });
                        $ionicLoading.hide();

                        $state.go('app.search');
                    }).catch(function (error) {
                        alert("Authentication failed:" + error.message);
                        $ionicLoading.hide();
                    });
                } else
                    alert("Please enter email and password both");
            };
        })





