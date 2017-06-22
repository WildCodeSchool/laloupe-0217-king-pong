angular.module('app')
    .controller('LoginController', function($scope, $state, Auth) {
        $scope.errors = [];
          $scope.inputType = "password";

          $scope.showPassword = function() {
            if ($scope.inputType === "password") {
              $scope.inputType = "text";
            } else {
              $scope.inputType = "password";
            }
          };

        $scope.login = function() {
            if ($scope.loginForm.$valid) {
                $scope.errors = [];
                Auth.login($scope.user).then(function(result) {
                    $state.go('main.home');
                }).catch(function(err) {
                    $scope.errors.push(err);
                });
            }
        };
    });
