angular.module('app')

  .controller('MainController', function($scope,Auth, $timeout, $mdSidenav, UserService, CurrentUser, $log, CommunityService,$state) {
    var userId = CurrentUser.user()._id;
    $scope.user = CurrentUser.user();

    console.log($scope.user);
    $scope.communitys = [];
    UserService.getOne(userId).then(function(res) {
      console.log("res",res.data);


      $scope.communitys = res.data.community;
      $scope.community = $scope.communitys[($scope.communitys.length-1)];
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







    $scope.categories = [];

            // CategoryService.getAll().then(function(res){
            //   console.log(res.data);
            //   $scope.categories = res.data;
            // });


    $scope.goToInvitation = function(id){
      $state.go("user.challenge",{id:$scope.challenge[id]._id});
    };

$scope.goCommunity =function() {
  $state.go("user.community");
};

  });
