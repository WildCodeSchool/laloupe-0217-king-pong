angular.module('app')
    .controller('InviteController', function($scope, $stateParams, SessionService, CurrentUser, $state, $timeout, UserService, CommunityService) {
        var community = $stateParams.community;

        $scope.invite = [];
        CommunityService.getOne(community).then(function(res) {
            res.data.users.forEach(function (user) {
              user.check = false;
            });
          });

$scope.addInvite = function(){
  var guest = $scope.communitys.filter(function (user) {
    console.log(user.check);
    return user.check;
  });
  $state.go('user.createDefis',{invites: guest, community: community});
};
    });
