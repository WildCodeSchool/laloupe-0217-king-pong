angular.module('app')
  .controller('CommunityController', function($scope, $timeout, $mdSidenav,UserService, CommunityService) {
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
      console.log(id);
    };
  });
