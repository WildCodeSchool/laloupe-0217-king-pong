angular.module('app')
  .controller('NavbarUserController', function($scope, Auth, CurrentUser, $timeout, $mdSidenav, $state) {
    if (CurrentUser.user().community.length === 0){

      $state.go('user.community');
    }else{
      return;
    }

  });
