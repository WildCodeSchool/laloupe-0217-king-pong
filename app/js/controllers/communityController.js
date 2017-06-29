angular.module('app')
  .controller('CommunityController', function($scope, CurrentUser, UserService, CommunityService, SessionService, $state,$timeout) {

    // variables
    var userId = CurrentUser.user()._id;
    $scope.communityParam = CurrentUser.user().community.length;
    $scope.communitys = [];


    //timer
    var timer = $timeout(function() {
      CommunityService.getAll().then(function(res) {
        $scope.communitys = res.data;
      });
    }, 500);


    $scope.addCommunity = function(id) {
      CommunityService.addUser(id, {
        users: userId
      }).then(function(res) {});
      UserService.addCommunity(userId, {
        community: id
      }).then(function(res) {
        $state.go('main.home');
      });
    };
  });
