angular.module('app')
    .controller('ArbitrageController', function($scope, CurrentUser) {
      $scope.user = CurrentUser.user();
    });
