angular.module('app')
  .controller('CommunityController', function($scope, CurrentUser, UserService, CommunityService, SessionService, $state,$timeout) {
    var userId = CurrentUser.user()._id;
    $scope.communitys = [];


    var timer = $timeout(function() {
      CommunityService.getAll().then(function(res) {
        $scope.communitys = res.data;
      });
    }, 1500);


    $scope.communityParam = CurrentUser.user().community;

    console.log($scope.communityParam);


    $scope.addCommunity = function(id) {
      CommunityService.addUser(id, {
        users: userId
      }).then(function(res) {});
      UserService.addCommunity(userId, {
        community: id
      }).then(function(res) {
        $state.go('user.home');
      });
    };
  });
