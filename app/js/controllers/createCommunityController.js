angular.module('app')
  .controller('CreateCommunityController', function($scope, SessionService, $state, $timeout, UserService, CurrentUser, CommunityService) {

    // functions
    $scope.navigateBefore = function() {
      $state.go('user.community');
    };


    $scope.valide = function() {
      $scope.newCommunity = [];
      var infoCommunity = {
        name: $scope.communityName,
        location: $scope.communityPlace,
      };


      $scope.newCommunity.push(infoCommunity);
      CommunityService.create(infoCommunity).then(function(res) {
        $state.go('main.home');
        sessionStorage.clear();
      });
    };
  });
