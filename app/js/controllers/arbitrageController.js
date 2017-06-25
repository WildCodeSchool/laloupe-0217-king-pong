angular.module('app')
  .controller('ArbitrageController', function($scope, $mdDialog, $timeout, $state, CurrentUser, ChallengeService, TeamService) {
    // variables
    $scope.user = CurrentUser.user();
    $scope.teams = [];
    $scope.team = {};
    var info;


    // function
    function nameTeams(teams) {
      for (var i = 0; i < teams.length; i++) {
        teams[i].name = (i + 1);
      }
      return teams;
    }


    $scope.showModal = function() {
      $mdDialog.show({
        contentElement: '#modalChoice',
        scope: $scope,
        controller: 'ArbitrageController',
        preserveScope: true,
        hasBackdrop: false,
        bindToController: true,
        clickOutsideToClose:true,
        locals: {
          team: $scope.team
        }

      });
    };



    $scope.choice = function(team) {
      $mdDialog.hide();

      $mdDialog.show({
        contentElement:'#modalValid',
        scope: $scope,
        controller: 'ArbitrageController',
        preserveScope: true,
        hasBackdrop: false,
        bindToController: true,
        clickOutsideToClose:true,
        locals: {
          team: $scope.team
        }
      });
    };

    $scope.goToHome = function() {
      $state.go('main.home');
    };

    $scope.valideScore = function(team) {
      $mdDialog.hide();
      if(team !== 'null'){
        $scope.teams.splice((team.name - 1),1);
        TeamService.updateScore(team._id, {
          resultat: "win"
        }).then(function(res) {
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
      $state.go('main.home')
    };

    // service
    ChallengeService.getOne($state.params.id).then(function(res) {
      $scope.teams = nameTeams(res.data.teams);
      $scope.challenge = res.data;
      console.log(res.data);

    });
  });
