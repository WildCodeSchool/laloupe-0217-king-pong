angular.module('app')
    .controller('ActivityDescriptionController', function($scope, $state, $stateParams, ActivityService, SessionService) {

        $scope.activity = JSON.parse(SessionService.get('activity') || '[]');



        $scope.navigateBefore = function() {
            $state.go('user.filterActivity',{community:$stateParams.community});
        };

        $scope.valide = function() {
            $state.go('user.createDefis',{community:$stateParams.community});
        };
        console.log($scope.activity);
    });
