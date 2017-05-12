angular.module('app')
  .controller('MainController', function($scope,Auth, $timeout, $mdSidenav, UserService, CurrentUser, $log,$state) {
    var userId = CurrentUser.user()._id;
    $scope.user = CurrentUser.user();
    UserService.getOne(userId).then(function(res) {

      $scope.communitys = res.data.community;
    });


    $scope.selected = function(index) {
    };


    function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function() {
            $log.debug("toggle " + navID + " is done");
          });
      };
    }

    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function() {
      return $mdSidenav('right').isOpen();
    };

    $scope.logout = function() {
            Auth.logout();
            $state.go('anon.login');
        };


    $scope.invitations = [{
      name: 'Foot',
      activity: 'Sport Extérieur',
      url: './img/foot.jpg'
    }, {
      name: 'PinPong',
      activity: 'Sport Intérieur',
      url: './img/ping-pong.jpg'
    }, {
      name: 'Fifa',
      activity: 'E-Sport',
      url: './img/jeuxVideo.jpg'
    }, {
      name: 'Echec',
      activity: 'Jeux Société',
      url: './img/echec.jpg'
    }];



    // $(function(){ $('.carousel.carousel-slider').carousel({full_width: true}); });


    // $scope.close = function () {
    //   // Component lookup should always be available since we are not using `ng-if`
    //   $mdSidenav('right').close()
    //     .then(function () {
    //       $log.debug("close RIGHT is done");
    //     });
    // };



  });
