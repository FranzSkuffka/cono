starter.controller('UserCtrl', function ($scope, $ionicModal, $firebaseAuth, $ionicLoading) {

    var ref = new Firebase(firebaseUrl);
    var auth = $firebaseAuth(ref);

    // Create the register modal 
    $ionicModal.fromTemplateUrl('templates/register.html', {
        scope: $scope
    }).then(function (modalR) {
        $scope.modalRegister = modalR;
    });

    // Triggered in the login modal to close it
    $scope.closeRegister = function () {
        $scope.modalRegister.hide();
    };

    // Triggered in the login modal to open it
    $scope.register = function () {
        $scope.modalRegister.show();
    };

    $scope.createUser = function (user) {
        console.log("Create User Function called");
        if (user.email && user.password) {
            $ionicLoading.show({
                template: 'Signing Up...'
            });

            auth.$createUser({
                email: user.email,
                password: user.password
            }).then(function (userData) {
                alert("User created successfully!");

                ref.child("visitors/").child(userData.uid).set({
                    email: user.email
                });

                $ionicLoading.hide();
                $scope.modalRegister.hide();
            }).catch(function (error) {
                alert("Error: " + error);
                $ionicLoading.hide();
            });
        } else
            alert("Please fill all details");
    };
});

 