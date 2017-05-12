angular.module('app')
  .controller('MainController', function($scope, $timeout, $mdSidenav, UserService, CurrentUser, $log) {
    var userId = CurrentUser.user()._id;
    $scope.user = CurrentUser.user();
    console.log($scope.user);
    // $scope.communitys = [];
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
          .then(function() {
            $log.debug("toggle " + navID + " is done");
          });
      };
    }

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
    $(function(){ $('.carousel.carousel-slider').carousel({full_width: true}); });


    // $scope.close = function () {
    //   // Component lookup should always be available since we are not using `ng-if`
    //   $mdSidenav('right').close()
    //     .then(function () {
    //       $log.debug("close RIGHT is done");
    //     });
    // };



    $scope.categories = [];

            CategoryService.getAll().then(function(res){
              console.log(res.data);
              $scope.categories = res.data;
            });


    $scope.goToInvitation = function(id){
      $state.go("user.challenge",{id:$scope.challenge[id]._id});
    };
  });
