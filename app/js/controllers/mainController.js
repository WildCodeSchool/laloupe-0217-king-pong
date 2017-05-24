angular.module('app')

  .controller('MainController', function($scope, Auth, $timeout, $mdSidenav, UserService, CurrentUser, $log, CommunityService, $state, $window) {
    var userId = CurrentUser.user()._id;
    $scope.user = CurrentUser.user();
    $scope.table = [{swiper:"",image:""}];

    $scope.onReadySwiper = function (swiper) {
      console.log(swiper);
      var id = swiper.params.index;
      var swiper1 = swiper.params.swiperId;
      var image1 = swiper.imagesLoaded;
      $scope.table[id] = {'swiper' : swiper1,'image' : image1};
      console.log($scope.table);


    };
    // $scope.onReadySwiper2 = function (swiper) {
    //   var swiper2 = swiper.params.swiperId;
    //   var image2 = swiper.imagesToLoad.length;
    //   var id = swiper.params.index;
    //
    // };

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
          'pagination-is-active':false
        },
        '1300': {
          'slidesPerView': 5,
          'spaceBetween': 200,
        },
        '1800': {
          'slidesPerView': 5,
          'spaceBetween': 200
        }
      }
    };



    $(document).ready(function() {
      $('ul.tabs').tabs();
    });

    $scope.communitys = [];
    UserService.getOne(userId).then(function(res) {
      $scope.communitys = res.data.community;
      $scope.community = $scope.communitys[($scope.communitys.length - 1)];
    });


    $scope.selected = function(index) {};


    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function() {
            $log.debug("toggle " + navID + " is done");
          });
      };
    }

    $scope.onSwipeLeft = buildToggler('right');

    $scope.onSwipeRight = function(ev) {
      $mdSidenav('right').close()
        .then(function() {
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

    $scope.arbitrages = [{
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
    }];
    $scope.defies = [{
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
    }];

    $scope.communityDefies = [{
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
    }];





    $scope.categories = [];

    // CategoryService.getAll().then(function(res){
    //   console.log(res.data);
    //   $scope.categories = res.data;
    // });


    $scope.goToInvitation = function(id) {
      $state.go("user.challenge", {
        id: $scope.challenge[id]._id
      });
    };

$scope.goCommunity =function() {
  $state.go("user.community");
};
$scope.invitation =function() {
  $state.go("user.invitation");
};
  });
