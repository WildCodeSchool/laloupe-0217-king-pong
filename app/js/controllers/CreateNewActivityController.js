angular.module('app')
    .controller('CreateNewActivityController', function($scope, $state, $stateParams,CreateActivityService, SessionService) {

      $scope.navigateBefore = function() {
          $state.go('user.filterActivity');
      };
      $scope.valide = function() {
      $scope.newActivity = [];
                 var infoActivity = {
                     activityName: $scope.activity,
                     description: $scope.description,
                     resultRule: $scope.resultRule,
                     numberOfTeam: $scope.teamNumber,
                     numberOfplayer: $scope.playerNumber,
                     duration: $scope.averageLast
                 };
                   $scope.newActivity.push(infoActivity);
                   console.log($scope.newActivity);
                 CreateActivityService.create(infoActivity).then(function(res) {
                   $state.go('user.filterActivity');
                   console.log(res);
                 });
               };
            });
