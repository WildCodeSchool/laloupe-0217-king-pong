angular.module('app')
    .controller('CreateActivityController', function($scope, $state, $stateParams, ActivityService, SessionService) {

                    ActivityService.getAll().then(function(res){
                      $scope.activity = res.data;
                      console.log($scope.activity);
                    }, function (err) {
                          });
                    $scope.addActivity = function(index) {
                      console.log(index);
                      SessionService.set('activity',JSON.stringify($scope.activity[index]));
                      $state.go('user.activityDescription');
                    };
                    $scope.navigateBefore = function() {
                    $state.go('user.createDefis');
                  };
            });
