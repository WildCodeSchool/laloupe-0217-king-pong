angular.module('app')
    .controller('LoginController', function($scope, $state, Auth) {
        $scope.errors = [];
        $scope.user = {email:$state.params.email};

        $scope.login = function() {
            if ($scope.loginForm.$valid) {
                $scope.errors = [];
                Auth.login($scope.user).then(function(result) {
                    $state.go('user.home');
                }).catch(function(err) {
                    $scope.errors.push(err);
                });
            }
        };
    });
