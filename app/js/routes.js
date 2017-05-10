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
                    'content@': {
                        templateUrl: 'user/home.html',
                        controller: 'MainController'
                    }
                }
            })
            .state('user.createDefis', {
                url: '/createDefis/:activity',
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
            .state('user.invitation', {
                url: '/invitation',

                views: {
                    'content@': {
                        templateUrl: 'user/invitation.html',
                        controller: 'invitationController',
                      }
                }
            })


            .state('user.filterActivity', {
                url: '/filteractivity',
                views: {
                    'content@': {
                        templateUrl: 'user/newDefiActivity.html',
                        controller: 'CreateActivityController',

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
