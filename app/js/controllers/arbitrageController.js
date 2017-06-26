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
        clickOutsideToClose: true,
        locals: {
          team: $scope.team
        }
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
      ChallengeService.update($state.params.id, {
        result: true
      }).then(function(res) {});
      if (team !== 'null') {
        $scope.teams.splice((team.name - 1), 1);
        TeamService.updateScore(team._id, {
          resultat: "win"
        }).then(function(res) {
          $scope.teams.forEach(function(team) {
            TeamService.updateScore(team._id, {
              resultat: "lose"
            }).then(function(res) {});
          });
        });
      } else {
        $scope.teams.forEach((team) => {
          TeamService.updateScore(team._id, {
            resultat: "null"
          }).then(function(res) {});
        });
      }
      $state.go('main.home');
    };


    // service
    ChallengeService.getOne($state.params.id).then(function(res) {
      console.log(res.data);
      $scope.teams = nameTeams(res.data.teams);
      $scope.start = res.data.newDate + ' ' + 'à' + ' ' + res.data.newTime;
      $scope.challenge = res.data;

    });
  });
