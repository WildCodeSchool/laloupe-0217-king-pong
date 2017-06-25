angular.module('app')
  .controller('NavbarHomeController', function($scope, Auth, CurrentUser, $timeout, $mdSidenav, $state, $rootScope, UserService, $log, CommunityService, $window, LocalService, InvitationService, ChallengeService, SharingDataService) {

    //function for send
    $rootScope.$on('$viewContentLoaded',
      function(event) {
        if (CurrentUser.user().community.length === 0 && $state.current.name !== 'user.community') {
          $state.go('user.community');
        }
      });

    // variables
    var userId = CurrentUser.user()._id;
    var currentCommunity = CurrentUser.user().community[CurrentUser.user().community.length - 1];
    var today = new Date();
    $scope.user = CurrentUser.user();
    $scope.community = {};


    //functions

    function refactoring(array) {
      if (array !== undefined) {
        array.forEach(function(challenge) {
          challenge.nbPlayer = [];
          challenge.teams.forEach(function(team) {
            team.players.forEach(function(player) {
              challenge.nbPlayer.push(player.avatar);
            });
          });
        });
        return array;
      } else {
        return [];
      }
    }

    function filterDate(items, callback) {
      var finish = [];
      var notFinish = [];
      if (items !== undefined) {
        items.map(function(element) {
          var date = element.diff;
          if (/^dans/.test(date)) {
            notFinish.push(element);
          } else {
            finish.push(element);
          }
        });
      }
      callback(null, {
        finish: finish,
        notFinish: notFinish
      });


    }

    $(document).ready(function() {
      $('ul.tabs').tabs();
    });
    if ($state.current.name === 'main.home') {
      $scope.selectedIndex = 0;
    } else {
      $scope.selectedIndex = 1;
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
      launchServices(userId, community._id);

    };

    function launchServices(userId, currentCommunity) {
      data = [];
      InvitationService.getByUser({
        player: userId,
        community: currentCommunity
      }).then(function(res) {
        console.log(refactoring(res.data));
        filterDate(refactoring(res.data), function(err, result) {
          if (err) {
            console.log(err);
          } else {
            SharingDataService.sendInvitations(result.notFinish);
            $scope.invitations = result.notFinish;
          }
        });
      });
      ChallengeService.getByUser({
        player: userId,
        community: currentCommunity
      }).then(function(res) {
        filterDate(refactoring(res.data), function(err, result) {
          if (err) {
            console.log(err);
          } else {
            $scope.arbitrages = result.finish;
            SharingDataService.sendArbitrages(result.finish);
            SharingDataService.sendPlayerDefies(result.notFinish);
          }
        });
      });

      ChallengeService.getByCommunity(currentCommunity).then(function(res) {
        console.log(res.data);

        filterDate(refactoring(res.data), function(err, result) {
          if (err) {
            console.log(err);
          }
          $scope.communityDefies = result.notFinish;
          SharingDataService.sendCommunity(result.notFinish);
        });
      });
    }
    // TODO: supprimer les defy passé
    launchServices(userId, currentCommunity);


  });
