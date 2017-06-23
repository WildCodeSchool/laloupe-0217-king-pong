angular.module('app')
    .controller('ResumController', function($scope, CurrentUser,ChallengeService) {
      $scope.user = CurrentUser.user();

      ChallengeService.getScoreByCommunity("591ed360c2a0f36f30b37c22").then(function(res){
        console.log(res.data);
      });
    });
