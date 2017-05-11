angular.module('app')
  .controller('MainController', function($scope, $timeout, $mdSidenav, UserService, CurrentUser,$log) {
    var userId = CurrentUser.user()._id;
    $scope.communitys = [];
    UserService.getOne(userId).then(function(res) {
      // console.log(res.data.community);
      //TODO add key for community
      $scope.communitys = res.data.community;
    });
    $scope.selected = function(index) {
      console.log(index);
    };

    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function() {
      return $mdSidenav('right').isOpen();
    };

    function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      };
    }


    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };

    $('.carousel.carousel-slider').carousel({
      fullWidth: true,
      shift: -150,
      padding: 80,
    });

  });
