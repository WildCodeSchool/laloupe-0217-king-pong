angular.module('app')
  .controller('ResumController', function($scope, $mdDialog, $timeout, $state, CurrentUser, ChallengeService, TeamService) {
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


    $scope.showSuppModal = function() {
      $mdDialog.show({
        contentElement: '#modalSupp',
        scope: $scope,
        controller: 'ResumController',
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
        controller: 'ResumController',
        preserveScope: true,
        hasBackdrop: false,
        bindToController: true,
        clickOutsideToClose:true,
        locals: {
          team: $scope.team
        }
      });
    };



    $scope.quit = function(){
      $mdDialog.hide();
    };

    $scope.goToHome = function() {
      $state.go('main.home');
    };

    $scope.suppChallenge = function(challengeId) {
      $mdDialog.hide();
      ChallengeService.delete(challengeId).then(function(res){
        console.log(res.data);
      });

      // $state.go('main.home');
    };

    // service
    ChallengeService.getOne($state.params.id).then(function(res) {
      console.log(res.data);
      $scope.teams = nameTeams(res.data.teams);
      $scope.start = res.data.newDate + ' ' +'à'+' ' +res.data.newTime;
      $scope.challenge = res.data;

    });
  });
