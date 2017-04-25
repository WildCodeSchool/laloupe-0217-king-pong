angular.module('app')
  .controller('CommunityController', function($scope, $timeout, $mdSidenav,UserService, CommunityService, SessionService) {
    $scope.communitys = [{
      _id: 1,
      name: "un"
    }, {
      _id: 2,
      name: "deux"
    }, {
      _id: 3,
      name: "trois"
    }];
    $scope.addCommunity = function(id){
      SessionService.set("community",JSON.stringify(id));
      console.log(id);
    };
  });
