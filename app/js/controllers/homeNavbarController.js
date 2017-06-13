angular.module('app')
  .controller('HomeNavbarController', function($scope, Auth, $mdSidenav, UserService, CurrentUser, $log, CommunityService, $state,LocalService) {

    // variables
    var userId = CurrentUser.user()._id;
    $scope.user = CurrentUser.user();

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
      console.log(res.data);
      $scope.communitys = res.data.community;
      $scope.community = $scope.communitys[($scope.communitys.length - 1)];
    });

    $scope.selected = function(index) {
      console.log($scope.community);
      LocalService.set('community',JSON.stringify($scope.community));

    };


    // sub navbar
    // if($state.current.name === 'user.home'){
    //   $(document).ready(function() {
    //     console.log($state.current.name);
    //     $('ul.tabs').tabs('select_tab', $state.current.name);
    //   });
    //
    // }

    //button

    $scope.toHome = function(){
      $state.go('user.home');
    };

    $scope.toRank = function(){
      $state.go('user.rank');
    };


  });
