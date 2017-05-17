angular.module('app')
    .controller('ActivityDescriptionController', function($scope, $state, $stateParams, ActivityService, SessionService) {

        $scope.activity = JSON.parse(SessionService.get('activity') || '[]');



        $scope.navigateBefore = function() {
            $state.go('user.filterActivity');
        };

        $scope.valide = function() {
            $state.go('user.createDefis');
        };
        console.log($scope.activity);
    });
