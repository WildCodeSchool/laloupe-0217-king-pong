angular.module('app')
  .controller('RegisterController', function($scope, $state, SessionService) {
    $scope.register = function() {
      SessionService.set("users", JSON.stringify($scope.user));
      $state.go('anon.community');


    };
  });
