angular.module('app')
  .controller('NavbarUserController', function($scope, Auth, CurrentUser, $timeout, $mdSidenav, $state, $rootScope) {
    $rootScope.$on('$viewContentLoaded',
      function(event) {
        if (CurrentUser.user().community.length === 0 && $state.current.name !== 'user.community') {
          $state.go('user.community');
        }if (CurrentUser.user().community.length === 0 && $state.current.name !== 'anon.login'){
          $state.go('anon.login');
        }
      });

  });
