angular.module('app')
  .controller('ResumController', function($scope, $mdDialog, $mdDateLocale, $timeout, $state, CurrentUser, ChallengeService, TeamService) {

    // variables
    $scope.user = CurrentUser.user();
    $scope.teams = [];
    $scope.team = {};
    $scope.currentDate = new Date();
    $scope.challenge = {};
    var info;


    // function
    function nameTeams(teams) {
      for (var i = 0; i < teams.length; i++) {
        teams[i].name = (i + 1);
      }
      return teams;
    }


    // button
    $scope.showSuppModal = function() {
      $mdDialog.show({
        contentElement: '#modalSupp',
        scope: $scope,
        controller: 'ResumController',
        preserveScope: true,
        hasBackdrop: false,
        bindToController: true,
        clickOutsideToClose: true,
        locals: {
          team: $scope.team
        }
      });
    };


    $scope.showEditModal = function() {
      $mdDialog.show({
        contentElement: '#modalEdit',
        scope: $scope,
        controller: 'ResumController',
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
        controller: 'ResumController',
        preserveScope: true,
        hasBackdrop: false,
        bindToController: true,
        clickOutsideToClose: true,
        locals: {
          team: $scope.team
        }
      });
    };


    $scope.showDesengage = function(team) {
      $mdDialog.hide();
      $mdDialog.show({
        contentElement: '#modalDesengage',
        scope: $scope,
        controller: 'ResumController',
        preserveScope: true,
        hasBackdrop: false,
        bindToController: true,
        clickOutsideToClose: true,
        locals: {
          team: $scope.team
        }
      });
    };


    $scope.showTeamModal = function(team) {
      $mdDialog.hide();
      $mdDialog.show({
        contentElement: '#modalChangeTeam',
        scope: $scope,
        controller: 'ResumController',
        preserveScope: true,
        hasBackdrop: false,
        bindToController: true,
        clickOutsideToClose: true,
        locals: {
          team: $scope.team
        }
      });
    };


    $scope.choiceNewTeam = function(team) {
      $scope.team = team;
      $mdDialog.hide();
      $mdDialog.show({
        contentElement: '#modalValideChange',
        scope: $scope,
        controller: 'ResumController',
        preserveScope: true,
        hasBackdrop: false,
        bindToController: true,
        clickOutsideToClose: true,
        locals: {
          team: team
        }
      });
    };


    $scope.quit = function() {
      $mdDialog.hide();
    };


    $scope.goToHome = function() {
      $state.go('main.home');
    };


    $scope.suppChallenge = function(challengeId) {
      $mdDialog.hide();
      ChallengeService.delete(challengeId).then(function(res) {
        console.log(res.data);
      });
      // $state.go('main.home');
    };


    $scope.quitChallenge = function(challengeId) {
      $mdDialog.hide();
      TeamService.leaveChallenge({
        challenge: challengeId,
        player: $scope.user._id
      }).then(function(res) {});
      $state.go('main.home');
    };


    $scope.valideChoiceTeam = function(teamId) {
      TeamService.changeTeam(teamId, {
        player: $scope.user._id,
        challenge: $scope.challenge._id
      }).then(function(res) {
        $mdDialog.hide();
        $state.go('user.resum',{id:$scope.challenge._id});
      });
    };


    // service
    ChallengeService.getOne($state.params.id).then(function(res) {
      $scope.teams = nameTeams(res.data.teams);
      console.log(res.data);
      $scope.start = res.data.newDate + ' ' + 'à' + ' ' + res.data.newTime;
      $scope.challenge = res.data;
      $scope.challenge.date = new Date($scope.challenge.date);

    });
  });
