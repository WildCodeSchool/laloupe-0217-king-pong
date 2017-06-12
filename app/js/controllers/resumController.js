angular.module('app')
    .controller('ResumController', function($scope, CurrentUser) {
      $scope.user = CurrentUser.user();
    });
