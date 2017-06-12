angular.module('app').controller('MainController', function($scope, Auth, $timeout, $mdSidenav, UserService, CurrentUser, $log, CommunityService, $state, $window) {

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

  function refactoring(array) {
    array.map(function(invitation) {
      invitation.nbPlayer = [];
      invitation.players.forEach(function(teams) {
        teams.team.forEach(function(player) {
          invitation.nbPlayer.push(player.joueur.avatar);
        });
      });
      return invitation;
    });
    return array;
  }

  // variables
  var userId = CurrentUser.user()._id;
  $scope.user = CurrentUser.user();

  function buildToggler(navID) {
    return function() {
      $mdSidenav(navID).toggle().then(function() {
        $log.debug("toggle " + navID + " is done");
      });
    };
  }

  // sidenav
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
    $scope.community = $scope.communitys[($scope.communitys.length - 1)];
  });

  $scope.selected = function(index) {};

  // sub navbar
  $(document).ready(function() {
    $('ul.tabs').tabs();
  });

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
  $scope.goToInvitation = function(id) {
    $state.go("user.invitation", {
      id: id
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

  // variables hard code
  $scope.invitations = [{
      name: 'Foot',
      activity: 'Sport Extérieur',
      url: './img/foot.jpg',
      start: '15h',
      duration: '45 min',
      players: [{
        team: [{
          joueur: {
            avatar: './img/olive.jpg'
          }
        }, {
          joueur: {
            avatar: './img/olive.jpg'
          }
        }, {
          joueur: {
            avatar: './img/olive.jpg'
          }
        }]
      }, {
        team: [{
          joueur: {
            avatar: './img/olive.jpg'
          }
        }, {
          joueur: {
            avatar: './img/olive.jpg'
          }
        }]
      }]
    }, {
      name: 'PinPong',
      activity: 'Sport Intérieur',
      url: './img/ping-pong.jpg',
      start: '5 jours',
      duration: '45 min',
      players: [{
        team: [{
          joueur: {
            avatar: './img/olive.jpg'
          }
        }]
      }, {
        team: [{
          joueur: {
            avatar: './img/olive.jpg'
          }
        }]
      }]
    }, {
      name: 'Fifa',
      activity: 'E-Sport',
      url: './img/jeuxVideo.jpg',
      start: '1jours',
      duration: '1H45 min',
      players: [{
        team: [{
          joueur: {
            avatar: './img/olive.jpg'
          }
        }]
      }, {
        team: [{
          joueur: {
            avatar: './img/olive.jpg'
          }
        }]
      }]
    }, {
      name: 'Echec',
      activity: 'Jeux Société',
      url: './img/echec.jpg',
      start: '2h',
      duration: '1H',
      players: [{
        team: [{
          joueur: {
            avatar: './img/olive.jpg'
          }
        }]
      }, {
        team: [{
          joueur: {
            avatar: './img/olive.jpg'
          }
        }]
      }]
    }

  ];

  refactoring($scope.invitations);



  $scope.arbitrages = [{
      name: 'Foot',
      activity: 'Sport Extérieur',
      url: './img/foot.jpg',
      start: '15h',
      duration: '45 min',
      players: [{
        team: [{
          joueur: {
            avatar: './img/olive.jpg'
          }
        }]
      }, {
        team: [{
          joueur: {
            avatar: './img/olive.jpg'
          }
        }]
      }]
    }, {
      name: 'PinPong',
      activity: 'Sport Intérieur',
      url: './img/ping-pong.jpg',
      start: '5 jours',
      duration: '45 min',
      players: [{
        team: [{
          joueur: {
            avatar: './img/olive.jpg'
          }
        }]
      }, {
        team: [{
          joueur: {
            avatar: './img/olive.jpg'
          }
        }]
      }]
    }, {
      name: 'Fifa',
      activity: 'E-Sport',
      url: './img/jeuxVideo.jpg',
      start: '1jours',
      duration: '1H45 min',
      players: [{
        team: [{
          joueur: {
            avatar: './img/olive.jpg'
          }
        }]
      }, {
        team: [{
          joueur: {
            avatar: './img/olive.jpg'
          }
        }]
      }]
    }, {
      name: 'Echec',
      activity: 'Jeux Société',
      url: './img/echec.jpg',
      start: '2h',
      duration: '1H',
      players: [{
        team: [{
          joueur: {
            avatar: './img/olive.jpg'
          }
        }]
      }, {
        team: [{
          joueur: {
            avatar: './img/olive.jpg'
          }
        }]
      }]
    }

  ];
  refactoring($scope.arbitrages);

  $scope.playerChallenges = [{
      name: 'Foot',
      activity: 'Sport Extérieur',
      url: './img/foot.jpg',
      start: '15h',
      duration: '45 min',
      players: [{
        team: [{
          joueur: {
            avatar: './img/olive.jpg'
          }
        }]
      }, {
        team: [{
          joueur: {
            avatar: './img/olive.jpg'
          }
        }]
      }]
    }, {
      name: 'PinPong',
      activity: 'Sport Intérieur',
      url: './img/ping-pong.jpg',
      start: '5 jours',
      duration: '45 min',
      players: [{
        team: [{
          joueur: {
            avatar: './img/olive.jpg'
          }
        }]
      }, {
        team: [{
          joueur: {
            avatar: './img/olive.jpg'
          }
        }]
      }]
    }, {
      name: 'Fifa',
      activity: 'E-Sport',
      url: './img/jeuxVideo.jpg',
      start: '1jours',
      duration: '1H45 min',
      players: [{
        team: [{
          joueur: {
            avatar: './img/olive.jpg'
          }
        }]
      }, {
        team: [{
          joueur: {
            avatar: './img/olive.jpg'
          }
        }]
      }]
    }, {
      name: 'Echec',
      activity: 'Jeux Société',
      url: './img/echec.jpg',
      start: '2h',
      duration: '1H',
      players: [{
        team: [{
          joueur: {
            avatar: './img/olive.jpg'
          }
        }]
      }, {
        team: [{
          joueur: {
            avatar: './img/olive.jpg'
          }
        }]
      }]
    }

  ];

  refactoring($scope.playerChallenges);

  $scope.communityDefies = [{
      name: 'Foot',
      activity: 'Sport Extérieur',
      url: './img/foot.jpg',
      start: '15h',
      duration: '45 min',
      players: [{
        team: [{
          joueur: {
            avatar: './img/olive.jpg'
          }
        }]
      }, {
        team: [{
          joueur: {
            avatar: './img/olive.jpg'
          }
        }]
      }]
    }, {
      name: 'PinPong',
      activity: 'Sport Intérieur',
      url: './img/ping-pong.jpg',
      start: '5 jours',
      duration: '45 min',
      players: [{
        team: [{
          joueur: {
            avatar: './img/olive.jpg'
          }
        }]
      }, {
        team: [{
          joueur: {
            avatar: './img/olive.jpg'
          }
        }]
      }]
    }, {
      name: 'PinPong',
      activity: 'Sport Intérieur',
      url: './img/ping-pong.jpg',
      start: '5 jours',
      duration: '45 min',
      players: [{
        team: [{
          joueur: {
            avatar: './img/olive.jpg'
          }
        }]
      }, {
        team: [{
          joueur: {
            avatar: './img/olive.jpg'
          }
        }]
      }]
    },  {
      name: 'PinPong',
      activity: 'Sport Intérieur',
      url: './img/ping-pong.jpg',
      start: '5 jours',
      duration: '45 min',
      players: [{
        team: [{
          joueur: {
            avatar: './img/olive.jpg'
          }
        }]
      }, {
        team: [{
          joueur: {
            avatar: './img/olive.jpg'
          }
        }]
      }]
    }, {
      name: 'Fifa',
      activity: 'E-Sport',
      url: './img/jeuxVideo.jpg',
      start: '1jours',
      duration: '1H45 min',
      players: [{
        team: [{
          joueur: {
            avatar: './img/olive.jpg'
          }
        }]
      }, {
        team: [{
          joueur: {
            avatar: './img/olive.jpg'
          }
        }]
      }]
    }, {
      name: 'Echec',
      activity: 'Jeux Société',
      url: './img/echec.jpg',
      start: '2h',
      duration: '1H',
      players: [{
        team: [{
          joueur: {
            avatar: './img/olive.jpg'
          }
        }]
      }, {
        team: [{
          joueur: {
            avatar: './img/olive.jpg'
          }
        }]
      }]
    }

  ];

  refactoring($scope.communityDefies);

});
