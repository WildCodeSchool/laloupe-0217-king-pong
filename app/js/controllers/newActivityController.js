angular.module('app')
    .controller('NewActivityController', function($scope, $state, $stateParams, ActivityService, SessionService) {

        ActivityService.getAll().then(function(res) {
            $scope.activity = res.data;
        }, function(err) {});
        $scope.addActivity = function(index) {
                  SessionService.set('activity', JSON.stringify($scope.activity[index]));
            $state.go('user.activityDescription');
        };
        $scope.navigateBefore = function() {
            $state.go('user.createDefis');
        };
        $scope.createNewActivity = function() {
            $state.go('user.createActivity');
        };
    });
