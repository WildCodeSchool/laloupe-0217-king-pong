angular.module('app')
  .controller('RegisterController', function($scope, $state, Auth, SessionService) {
    $scope.register = function() {
      SessionService.set("users", JSON.stringify($scope.user));
      $state.go('anon.community');

      // Auth.register($scope.user).then(function(res) {
      //
      //
      // });
    };
  });
