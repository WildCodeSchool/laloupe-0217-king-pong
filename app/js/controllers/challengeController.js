angular.module('app')
    .controller('ChallengeController', function($scope, ChallengeService, $state) {
      // var id = $state.params;

$scope.challenges = [];

        ChallengeService.getAll().then(function(res){
          console.log(res.data);
          $scope.challenges = res.data[0];
        });



    });
