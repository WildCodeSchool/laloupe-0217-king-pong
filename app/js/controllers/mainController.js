angular.module('app').controller('MainController', function($scope, Auth, CurrentUser, $log, $state, $window, $timeout, LocalService, SharingDataService) {


  // variables
  var userId = CurrentUser.user()._id;
  var currentCommunity = CurrentUser.user().community[CurrentUser.user().community.length - 1];
  var today = new Date();
  var datas = {};
  $scope.user = CurrentUser.user();
  $scope.community = {};
  $scope.invitations = {};
  $scope.arbitrages = {};
  $scope.playerChallenges = {};
  $scope.communityDefies = {};


  //SharingDataService for adding value of NavbarHomeController
  $scope.$watch(function() {
    return SharingDataService.getInvitations();
  }, function(newValue, oldValue) {
    $scope.invitations = newValue;
  });
  $scope.$watch(function() {
    return SharingDataService.getArbitrages();
  }, function(newValue, oldValue) {
    $scope.arbitrages = newValue;
  });
  $scope.$watch(function() {
    return SharingDataService.getPlayerDefies();
  }, function(newValue, oldValue) {
    $scope.playerChallenges = newValue;
  });
  $scope.$watch(function() {
    return SharingDataService.getCommunity();
  }, function(newValue, oldValue) {
    $scope.communityDefies = newValue;
  });


  // slider options break
  $scope.slideOption = {
    'slidesPerView': 5,
    'spaceBetween': 20,
    'breakpoints': {
      '320': {
        'slidesPerView': 2,
        'spaceBetween': 20
      },
      '480': {
        'slidesPerView': 2,
        'spaceBetween': 40
      },
      '768': {
        'slidesPerView': 3,
        'spaceBetween': 170
      },
      '1024': {
        'slidesPerView': 4,
        'spaceBetween': 230,
        'pagination-is-active': false
      },
      '1300': {
        'slidesPerView': 5,
        'spaceBetween': 200
      },
      '1800': {
        'slidesPerView': 5,
        'spaceBetween': 200
      }
    }
  };

  // cards buttons
  $scope.goToInvitation = function(object) {
    console.log(object);

    $state.go("user.invitations", {
      id: object.invitation._id
    });
  };
  $scope.goToArbitrage = function(id) {
    $state.go("user.arbitrage", {
      id: id
    });
  };
  $scope.goToResum = function(id) {
    $state.go("user.resum", {
      id: id
    });
  };

  //newDefy buton with scroll effect
  var axis = $window.pageYOffset;
  var timer;
  $scope.showButton = true;

  angular.element($window).bind("scroll", function() {
    $scope.showButton = false;
    if (axis !== $window.pageYOffset) {
      axis = $window.pageYOffset;
      $timeout.cancel(timer);
      timer = $timeout(function() {
        $scope.showButton = true;
      }, 1000);
    }
    axis = $window.pageYOffset;
    $scope.$apply();
  });

  $scope.toCreate = function() {
    var community = JSON.parse(LocalService.get('community'));
    $state.go('user.createDefis', {
      community: community._id
    });
  };

});
