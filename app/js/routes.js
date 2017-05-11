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
            })
            .state('anon.community', {
                url: '/community',
                views: {
                    'content@': {
                        templateUrl: 'anon/community.html',
                        controller: 'CommunityController'
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
                        controller: 'NavbarController'
                    }
                },
                data: {
                    access: AccessLevels.user
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
