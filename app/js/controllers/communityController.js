angular.module('app')
  .controller('CommunityController', function($scope, CurrentUser, UserService, CommunityService, SessionService, $state) {
    var userId = CurrentUser.user()._id;
    $scope.communitys = [];

    CommunityService.getAll().then(function(res)
{
$scope.communitys = res.data;
  });


    $scope.addCommunity = function(id) {
      CommunityService.addUser(id,{users: userId}).then(function(res){});
      UserService.addCommunity(userId, {
          community: id
        }).then(function(res) {
          $state.go('user.home');
        });
    };  });
