angular.module('app')
  .controller('RegisterController', function($scope, $state, SessionService) {
    $scope.user = JSON.parse(SessionService.get('users')||'{}');
    $scope.register = function() {
      SessionService.set("users", JSON.stringify($scope.user));
      $state.go('anon.community');


    };
  });
