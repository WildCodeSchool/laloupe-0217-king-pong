angular.module('app')
  .controller('NavbarHomeController', function($scope, Auth, CurrentUser, $timeout, $mdSidenav, $state, $rootScope, UserService, $log, CommunityService, $window, LocalService, InvitationService, ChallengeService,SharingDataService) {
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
      // $scope.invitations = {};
      // $scope.arbitrages = {};
      // $scope.playerChallenges = {};
      // $scope.communityDefies = {};

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
        $state.reload('main.home');

      };

      function launchServices(userId, currentCommunity){
        data = [];
      InvitationService.getByUser({
        player: userId,
        community: currentCommunity
      }).then(function(res) {
        $scope.invitations = res.data;
        refactoringInvitations($scope.invitations);
        SharingDataService.sendInvitations( $scope.invitations);

      });
      ChallengeService.getByUser({
        player: userId,
        community: currentCommunity
      }).then(function(res) {
        refactoring(res.data, function(newData) {
          filterDate(newData, function(result) {
            $scope.arbitrages = result.finish;
            $scope.playerChallenges = result.notFinish;
            SharingDataService.sendArbitrages( $scope.arbitrages);
            SharingDataService.sendPlayerDefies( $scope.playerChallenges);

          });

        });
      });

      ChallengeService.getByCommunity(currentCommunity).then(function(res) {
        refactoring(res.data, function(newData) {
          filterDate(newData, function(result) {
            $scope.communityDefies = result.notFinish;
            SharingDataService.sendInCommunity($scope.communityDefies);

          });
        });
      });
    }
      // TODO: supprimer les defy passé
    launchServices(userId, currentCommunity);


  });
