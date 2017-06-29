angular.module('app')
    .controller('RankController', function($scope, CurrentUser,ChallengeService, SharingDataService) {
      $scope.user = CurrentUser.user();


    });
