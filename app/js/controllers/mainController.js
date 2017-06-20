angular.module('app').controller('MainController', function($scope,$rootScope,$log, $timeout, CurrentUser, $state, $window, LocalService, SharingDataService, InvitationService, ChallengeService) {

  $scope.onReadySwiper = function (swiper) {

      console.log(swiper);
    };
  // variables
  var userId = CurrentUser.user()._id;
  $scope.community = {};
  $scope.invitations = {};
  $scope.arbitrages = {};
  $scope.playerChallenges = {};
  $scope.communityDefies = {};


  //functions
  function refactoringInvitations(array) {
    array.map(function(element) {
      element.invitation.challenge.nbPlayer = [];
      element.invitation.challenge.teams.map(function(team) {
        team.players.map(function(player) {
          element.invitation.challenge.nbPlayer.push(player.avatar);
        });
      });
      return element;
    });
    return array;
  }


  function refactoring(array, callback) {
    array.map(function(element) {
      element.challenge.nbPlayer = [];
      element.challenge.teams.map(function(team) {
        team.players.map(function(player) {
          element.challenge.nbPlayer.push(player.avatar);
        });
      });
      return element;
    });
    callback(array);
  }


  function filterDate(items, callback) {
    var finish = [];
    var notFinish = [];
    items.map(function(element) {
      var date = element.diff;
      if (/^dans/.test(date)) {
        notFinish.push(element);
      } else {
        finish.push(element);
      }
    });
    callback({
      finish: finish,
      notFinish: notFinish
    });
  }


  function launchServices(userId, community) {
    InvitationService.getByUser({
      player: userId,
      community: community
    }).then(function(res) {
      $scope.invitations = res.data;
      refactoringInvitations($scope.invitations);
      SharingDataService.sendSumA($scope.invitations.length);
    });


    ChallengeService.getByUser({
      player: userId,
      community: community
    }).then(function(res) {
      refactoring(res.data, function(newData) {
        filterDate(newData, function(result) {
          $scope.arbitrages = result.finish;
          $scope.playerChallenges = result.notFinish;
            SharingDataService.sendSumB($scope.arbitrages.length);
        });
      });
    });


    ChallengeService.getByCommunity(community).then(function(res) {
      refactoring(res.data, function(newData) {
        filterDate(newData, function(result) {
          $scope.communityDefies = result.notFinish;
        });
      });
    });

  }


  // slider options breakpoints
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
  $scope.showButton = true;


  angular.element($window).bind("scroll", function() {
    if (axis < $window.pageYOffset) {
      $scope.showButton = false;
      axis = $window.pageYOffset;
    } else {
      $scope.showButton = true;
      axis = $window.pageYOffset;
    }
    $scope.$apply();
  });


  $scope.toCreate = function() {
    var community = JSON.parse(LocalService.get('community'));
    $state.go('user.createDefis', {
      community: community._id
    });
  };


  //launch function with timer for adding community _id from NavbarHomeController and launch services
  var timer = $timeout(function() {
    $scope.$watch(function() {
      return SharingDataService.getCommunity();
    }, function(newValue, oldValue) {
      launchServices(userId, newValue);
    });

  }, 100);


});
