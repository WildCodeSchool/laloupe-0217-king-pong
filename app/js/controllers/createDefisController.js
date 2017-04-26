angular.module('app')
    .controller('CreateDefisController', function($scope, $state, $stateParams) {

        $scope.activity = "";
        $scope.filterActivity = function() {
            $state.go('user.filterActivity', $stateParams);
        };
        $scope.activity = $stateParams.activity;
          });
