angular.module('app')
    .controller('CreateDefisController', function($scope, $state) {
        $scope.filterActivity = function() {
            $state.go('user.filterActivity');
        };
    });
