angular.module('app')
  .controller('InviteController', function($scope, $stateParams, SessionService, CurrentUser, $state,$timeout, UserService, CommunityService) {
    var community = $stateParams.community;

    CommunityService.getOne(community).then(function(res) {
      $scope.communitys = res.data.users;
      console.log('res community', $scope.communitys);

});

  });
