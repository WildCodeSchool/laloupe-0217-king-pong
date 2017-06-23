angular.module('app')
  .controller('ArbitrageController', function($scope, $state, CurrentUser, ChallengeService, TeamService) {
    // variables
    $scope.user = CurrentUser.user();
    $scope.teams = [];


    // function
    function nameTeams(teams) {
      for (var i = 0; i < teams.length; i++) {
        teams[i].name = (i + 1);
      }
      return teams;
    }

    $scope.choiceTeam = function(team) {
      if(team){
        team = JSON.parse(team);
        $scope.teams.splice((team.name - 1),1);
        TeamService.updateScore(team._id, {
          resultat: "win"
        }).then(function(res) {
          console.log(res);
          $scope.teams.forEach(function(team) {
            TeamService.updateScore(team._id, {
              resultat: "lose"
            }).then(function(res) {
              console.log(res);
            });
          });
        });
      }else{
        $scope.teams.forEach((team)=>{
          TeamService.updateScore(team._id, {
            resultat: "null"
          }).then(function(res) {
            console.log(res);
          });
        });
      }
    };

    // service
    ChallengeService.getOne($state.params.id).then(function(res) {
      $scope.teams = nameTeams(res.data.teams);
      $scope.challenge = res.data;
      console.log(res.data);

    });
  });
