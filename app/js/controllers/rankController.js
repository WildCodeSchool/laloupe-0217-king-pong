angular.module('app')
    .controller('RankController', function($scope, CurrentUser) {
      $scope.user = CurrentUser.user();
    });
