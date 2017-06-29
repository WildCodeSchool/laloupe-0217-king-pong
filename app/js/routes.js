angular.module('app')
  .config(function($stateProvider, $urlRouterProvider, AccessLevels) {
    $stateProvider
      .state('anon', {
        abstract: true,
        data: {
          access: AccessLevels.anon
        },
        views: {
        }
      })
      .state('anon.login', {
        url: '/',
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
      .state('main', {
        abstract: true,
        url: '/user',
        views: {
          'navbar@': {
            templateUrl: 'user/homeNavbar.html',
            controller: 'NavbarHomeController'
          }
        },
        data: {
          access: AccessLevels.user
        }
      })
      .state('main.home', {
        url: '/',
        views: {

          'content@': {
            templateUrl: 'user/home.html',
            controller: 'MainController'
          }
        }
      })
      .state('main.rank', {
        url: '/rank',
        views: {

          'content@': {
            templateUrl: 'user/rank.html',
            controller: 'RankController',
          }
        }
      });

    $stateProvider
      .state('user', {
        abstract: true,
        url: '/user',
        views: {
          'navbar@': {
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
        url: '/activityDescription/:activity/:community',

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
        url: '/filteractivity/:community',
        views: {
          'content@': {
            templateUrl: 'user/newActivity.html',
            controller: 'NewActivityController',

          }

        }
      })
      .state('user.createActivity', {
        url: '/createactivity/:community',
        views: {
          'content@': {
            templateUrl: 'user/createNewActivity.html',
            controller: 'CreateNewActivityController',

          }

        }
      })
      .state('user.invitations', {
        url: '/invitations/:id',
        views: {
          'content@': {
            templateUrl: 'user/invitations.html',
            controller: 'InvitationsController',

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

      .state('user.inCommunity', {
        url: '/resumCommunity/:id',
        views: {
          'content@': {
            templateUrl: 'user/inCommunity.html',
            controller: 'InCommunityController',

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
