angular.module('app')
  .controller('NavbarHomeController', function($scope, $mdSidenav, $state, $rootScope, $log, CurrentUser, UserService, LocalService, SharingDataService) {


    //function for send user to community page when community is none
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
    $scope.sumDefies = Number;

    //tabs initialization
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
      SharingDataService.sendCommunity($scope.community._id);
      LocalService.set('community', JSON.stringify($scope.community));
    });


    $scope.selected = function(community) {
      LocalService.set('community', JSON.stringify(community));
      SharingDataService.sendCommunity(community._id);
      $state.reload('main.home');
    };


    $scope.$watch(function() {
      return SharingDataService.getSum();
    }, function(newValue, oldValue) {
      $scope.sumDefies = newValue;
    });


  });
