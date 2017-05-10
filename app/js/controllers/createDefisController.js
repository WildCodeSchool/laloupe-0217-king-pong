angular.module('app')
    .controller('CreateDefisController', function($scope, $state, $stateParams, ActivityService, SessionService) {

        $scope.activity = JSON.parse(SessionService.get('activity') || '[]');
        // $scope.activity = "";

        console.log($scope.activity);
        $scope.filterActivity = function() {
            $state.go('user.filterActivity', $stateParams);
        };

        $scope.durations = [
            "15mn",
            "30mn",
            "45mn",
            "1h00",
            "1h15",
            "1h30",
            "1h45",
            "2h00"
        ];

        $scope.goToHome = function() {
            $state.go('user.home');
        };
    });
