angular.module('app')
  .controller('CommunityController', function($scope, CurrentUser, UserService, CommunityService, SessionService, $state) {
    var userId = CurrentUser.user()._id;
    $scope.communitys = [{
      _id: "58fdeef005219f2cac9c9f86",
      name: "WCS Chartres",
      location: "Chartes"
    }, {
      _id: "58fdeef005219f2cac9c9f87",
      name: "Ecole 42",
      location: "Paris"
    }, {
      _id: "58fdeef005219f2cac9c9f88",
      name: "WCS Lyon",
      location: "Lyon"
    }];


    $scope.addCommunity = function(id) {
      UserService.addCommunity(userId, {
          community: id
        }).then(function(res) {
          $state.go('user.home');
        });
    };
  });
