angular.module('app')
    .controller('CreateDefisController', function($scope, $state, Auth) {
        $scope.create = function() {
            Auth.create($scope.user).then(function() {
                $state.go('user.createDefis');
            });
        };
    });
