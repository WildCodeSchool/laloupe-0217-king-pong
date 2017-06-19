angular.module('app').controller('MainController', function($scope, Auth, $timeout, $mdSidenav, UserService, CurrentUser, $log, CommunityService, $state, $window, LocalService, InvitationService, ChallengeService) {

  // variables
  var userId = CurrentUser.user()._id;
  var currentCommunity = CurrentUser.user().community[CurrentUser.user().community.length - 1];
  $scope.user = CurrentUser.user();
  $scope.community = {};

  //button
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


  // sidenav
  function buildToggler(navID) {
    return function() {
      $mdSidenav(navID).toggle().then(function() {
        $log.debug("toggle " + navID + " is done");
      });
    };
  }

  $scope.onSwipeLeft = buildToggler('right');

  $scope.onSwipeRight = function(ev) {
    $mdSidenav('right').close().then(function() {
      $log.debug("close RIGHT is done");

    });
  };

  $scope.toggleRight = buildToggler('right');
  $scope.isOpenRight = function() {
    return $mdSidenav('right').isOpen();
  };

  $scope.logout = function() {
    Auth.logout();
    $state.go('anon.login');
  };

  // select
  $scope.communitys = [];
  UserService.getOne(userId).then(function(res) {
    $scope.communitys = res.data.community;
    $scope.community = $scope.communitys[$scope.communitys.length - 1];
    LocalService.set('community', JSON.stringify($scope.community));
  });

  $scope.selected = function(community) {
    currentCommunity = community;
    LocalService.set('community', JSON.stringify(community));
  };


  // sub navbar
  $(document).ready(function() {
    $('ul.tabs').tabs();
  });
  if ($state.current.name === 'user.home') {
    $scope.selectedIndex = 0;
  } else {
    $scope.selectedIndex = 1;
  }


  // slider options
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
  //Service
  var today = new Date();

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


  InvitationService.getByUser({
    player: userId,
    community: currentCommunity
  }).then(function(res) {
    $scope.invitations = res.data;
    refactoringInvitations($scope.invitations);

  });
  ChallengeService.getByUser({
    player: userId,
    community: currentCommunity
  }).then(function(res) {
    console.log('1', res.data);
    refactoring(res.data, function(newData) {
      filterDate(newData, function(result) {
        $scope.arbitrages = result.finish;
        $scope.playerChallenges = result.notFinish;
      });

    });
  });

  ChallengeService.getByCommunity(currentCommunity).then(function(res) {
    console.log('2', res.data);
    refactoring(res.data, function(newData) {
      filterDate(newData, function(result) {
        $scope.communityDefies = result.notFinish;
      });
    });
  });

  // TODO: supprimer les defy passé


});
