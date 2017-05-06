angular.module('app')
  .controller('CommunityController', function($scope, Auth, UserService, CommunityService, SessionService, $state) {
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
    var current = [];
    current = JSON.parse(SessionService.get('users'));

    $scope.addCommunity = function(id) {
      current.community = id;
      console.log(id);
      SessionService.unset('users');
      Auth.register(current);
      $state.go("user.home");
    };
  });
