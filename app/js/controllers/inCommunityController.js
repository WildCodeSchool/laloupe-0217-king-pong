angular.module('app')
  .controller('InCommunityController', function($scope, $mdDialog, $state, ChallengeService) {

    // variables
    $scope.teams = [];
    $scope.challenge = {};
    $scope.state = $state;


    // function
    function nameTeams(teams) {
      for (var i = 0; i < teams.length; i++) {
        teams[i].name = (i + 1);
      }
      return teams;
    }


    $scope.return = function() {
      $state.go('main.home');
    };


    // service
    ChallengeService.getOne($state.params.id).then(function(res) {
      $scope.teams = nameTeams(res.data.teams);
      $scope.start = res.data.newDate + ' ' + 'à' + ' ' + res.data.newTime;
      $scope.challenge = res.data;
    });

  });
