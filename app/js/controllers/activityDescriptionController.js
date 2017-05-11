angular.module('app')
    .controller('ActivityDescriptionController', function($scope, $state, $stateParams, ActivityService, SessionService) {

        $scope.activity = JSON.parse(SessionService.get('activity') || '[]');

        // ActivityService.getOne().then(function(res) {
        //     $scope.activity = res.data;
        //     console.log($scope.activity);
        // }, function(err) {});

        $scope.navigateBefore = function() {
            $state.go('user.filterActivity');
        };

        $scope.valide = function() {
            $state.go('user.createDefis');
        };
    });
