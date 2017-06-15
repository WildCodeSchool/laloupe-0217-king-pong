angular.module('app')
    .controller('NewActivityController', function($scope, $state, $stateParams, ActivityService, SessionService) {


        ActivityService.getAll().then(function(res) {
            $scope.activity = res.data;
        }, function(err) {});
        $scope.addActivity = function(activity) {
                  SessionService.set('activity', JSON.stringify(activity));
            $state.go('user.activityDescription',{community:$stateParams.community});
        };
        $scope.navigateBefore = function() {
            $state.go('user.createDefis',{community:$stateParams.community});
        };
        $scope.createNewActivity = function() {
            $state.go('user.createActivity',{community:$stateParams.community});
        };
    });
