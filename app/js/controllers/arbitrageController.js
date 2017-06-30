angular.module('app')
  .controller('ArbitrageController', function($scope, $mdDialog, $timeout, $state, CurrentUser, ChallengeService, TeamService) {

    // variables
    $scope.user = CurrentUser.user();
    $scope.teams = [];
    $scope.team = {};
    $scope.isResultNul = false;
    var info,
        verif;

    // function
    function nameTeams(teams) {
      for (var i = 0; i < teams.length; i++) {
        teams[i].name = (i + 1);
      }
      return teams;
    }

    function verifNumberTeam(teams){
      return teams.filter(function(team){
        return team.players.length > 0;
      });
    }


    $scope.showModal = function() {
      if (verif) {
      $mdDialog.show({
        contentElement: '#modalChoice',
        scope: $scope,
        controller: 'ArbitrageController',
        preserveScope: true,
        hasBackdrop: false,
        bindToController: true,
        clickOutsideToClose: true,
        locals: {
          team: $scope.team
        }
      });
    }else{
      $mdDialog.show({
        contentElement: '#modalSupp',
        scope: $scope,
        controller: 'ArbitrageController',
        preserveScope: true,
        hasBackdrop: false,
        bindToController: true,
        clickOutsideToClose: true,
        locals: {
          team: $scope.team
        }
      });
    }
    };

    $scope.suppChallenge = function(challengeId) {
      $mdDialog.hide();
      ChallengeService.delete(challengeId).then(function(res) {
        $state.go('main.home');
      });

    };

    $scope.choice = function(team) {
      $mdDialog.hide();
      $mdDialog.show({
        contentElement: '#modalValid',
        scope: $scope,
        controller: 'ArbitrageController',
        preserveScope: true,
        hasBackdrop: false,
        bindToController: true,
        clickOutsideToClose: true,
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
      console.log($scope.teams);
      ChallengeService.update($state.params.id, {
        result: true
      }).then(function(res) {
      if (team !== 'null') {
        TeamService.updateScore(team._id, {
          resultat: "win"
        }).then(function(res) {
          console.log($scope.teams);
          $scope.teams.splice((team.name - 1), 1);
          console.log($scope.teams);
          $scope.teams.forEach(function(team) {
            TeamService.updateScore(team._id, {
              resultat: "lose"
            }).then(function(res) {
              console.log('lose');
              console.log(res.data);
            });
          });
          $state.go('main.home');
        });
      } else {
        $scope.teams.forEach(function(team){
          TeamService.updateScore(team._id, {
            resultat: "null"
          }).then(function(res) {
          });
        });
        $state.go('main.home');
      }
      });
    };


    // service
    ChallengeService.getOne($state.params.id).then(function(res) {
      $scope.teams = nameTeams(res.data.teams);
      console.log($scope.teams);
      $scope.isResultNul = /nul/g.test(res.data.activity.resultRule);
      verif = (verifNumberTeam(res.data.teams)).length >1;

      $scope.start = res.data.newDate + ' ' + 'à' + ' ' + res.data.newTime;
      $scope.challenge = res.data;

    });
  });
