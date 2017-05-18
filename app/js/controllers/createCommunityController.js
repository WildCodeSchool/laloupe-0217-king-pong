angular.module('app')
  .controller('CreateCommunityController', function($scope, SessionService, $state,$timeout, UserService, CurrentUser, CommunityService) {
    $scope.navigateBefore = function() {
        $state.go('user.community');
    };
  $scope.valide = function() {
    $scope.newCommunity=[];

    var infoCommunity = {
        name: $scope.communityName,
        location: $scope.communityPlace,
        users: CurrentUser.user()._id

    };

    $scope.newCommunity.push(infoCommunity);
  CommunityService.create(infoCommunity).then(function(res) {
      console.log(res);
        // $state.go('user.home');
        // sessionStorage.clear();
    });
  };
  });
