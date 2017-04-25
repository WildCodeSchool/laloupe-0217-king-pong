angular.module('app')
  .controller('CommunityController', function($scope, $timeout, $mdSidenav,UserService, CommunityService, SessionService,$state) {
    $scope.communitys = [{
      _id: 1,
      name: "WCS Chartres",
      location:"Chartes"
    }, {
      _id: 2,
      name: "Ecole 42",
      location:"Paris"
    }, {
      _id: 3,
      name: "WCS Lyon",
      location:"Lyon"
    }];
    $scope.addCommunity = function(id){
      SessionService.set("community",JSON.stringify(id));
      
      $state.go("user.home");
    };
  });
