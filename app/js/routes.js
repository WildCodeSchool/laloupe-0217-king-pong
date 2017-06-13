angular.module('app')
  .config(function($stateProvider, $urlRouterProvider, AccessLevels) {
    $stateProvider
      .state('anon', {
        abstract: true,
        data: {
          access: AccessLevels.anon
        },
        views: {
          'navbar@': {
            templateUrl: 'anon/navbar.html',
            controller: 'NavbarController'
          }
        }
      })
      .state('anon.home', {
        url: '/',
        views: {
          'content@': {
            templateUrl: 'anon/home.html',
            controller: 'MainController'
          }
        }
      })
      .state('anon.login', {
        url: '/login',
        views: {
          'content@': {
            templateUrl: 'anon/login.html',
            controller: 'LoginController'
          }
        }
      })
      .state('anon.register', {
        url: '/register',
        views: {
          'content@': {
            templateUrl: 'anon/register.html',
            controller: 'RegisterController'
          }
        }
      });

    $stateProvider
      .state('user', {
        abstract: true,
        url: '/user',
        views: {
          'navbar@': {
            templateUrl: 'user/navbar.html',
            controller: 'NavbarUserController'
          }
        },
        data: {
          access: AccessLevels.user
        }

      })
      .state('user.community', {
        url: '/community',
        views: {
          'content@': {
            templateUrl: 'user/community.html',
            controller: 'CommunityController'
          }
        }
      })
      .state('user.dashboard', {
        url: '/dashboard',
        views: {
          'content@': {
            templateUrl: 'user/dashboard.html',
            controller: 'DashboardController'
          }
        }
      })
      .state('user.home', {
        url: '/',
        views: {
          'navbar@': {
            templateUrl: 'user/homeNavbar.html',
            controller: 'HomeNavbarController'
          },
          'content@': {
            templateUrl: 'user/home.html',
            controller: 'MainController'
          }
        }
      })
      .state('user.createDefis', {
        url: '/createDefis/:community/:invites',
        views: {
          'content@': {
            templateUrl: 'user/createDefis.html',
            controller: 'CreateDefisController',
          }
        }
      })
      .state('user.activityDescription', {
        url: '/activityDescription/:activity',

        views: {
          'content@': {
            templateUrl: 'user/activityDescription.html',
            controller: 'ActivityDescriptionController',
          }
        }
      })
      .state('user.challenge', {
        url: '/challenge',
        views: {
          'content@': {
            templateUrl: 'user/challenge.html',
            controller: 'ChallengeController',
          }
        }
      })


      .state('user.filterActivity', {
        url: '/filteractivity',
        views: {
          'content@': {
            templateUrl: 'user/newActivity.html',
            controller: 'NewActivityController',

          }

        }
      })
      .state('user.createActivity', {
        url: '/createactivity',
        views: {
          'content@': {
            templateUrl: 'user/createNewActivity.html',
            controller: 'CreateNewActivityController',

          }

        }
      })
      .state('user.createCommunity', {
        url: '/createCommunity',
        views: {
          'content@': {
            templateUrl: 'user/createCommunity.html',
            controller: 'CreateCommunityController',

          }

        }
      })

      .state('user.resum', {
        url: '/resum/:id',
        views: {
          'content@': {
            templateUrl: 'user/resum.html',
            controller: 'ResumController',

          }

        }
      })
      .state('user.arbitrage', {
        url: '/arbitrage/:id',
        views: {
          'content@': {
            templateUrl: 'user/arbitrage.html',
            controller: 'ArbitrageController',


          }

        }
      })
      .state('user.rank', {
        url: '/rank',
        views: {
          'navbar@': {
            templateUrl: 'user/homeNavbar.html',
            controller: 'HomeNavbarController'
          },
          'content@': {
            templateUrl: 'user/rank.html',
            controller: 'RankController',


          }

        }
      })
      .state('user.profile', {
        url: '/profile',
        views: {
          'content@': {
            templateUrl: 'user/profile.html',
            controller: 'ProfileController'
          }
        }
      });
    $urlRouterProvider.otherwise('/');
  });
