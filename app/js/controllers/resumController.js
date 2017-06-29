angular.module('app')
  .controller('ResumController', function($scope, $mdDialog,$interval, $mdDateLocale, $filter, $timeout, $state, CurrentUser, ChallengeService, TeamService) {

    // variables
    var info;
    $scope.user = CurrentUser.user();
    $scope.teams = [];
    $scope.team = {};
    $scope.currentDate = new Date();
    $scope.challenge = {};
    $scope.state = $state;
    $scope.durations = [
      "15mn",
      "30mn",
      "45mn",
      "1h00",
      "1h15",
      "1h30",
      "1h45",
      "2h00"
    ];


    // function
    function nameTeams(teams) {
      for (var i = 0; i < teams.length; i++) {
        teams[i].name = (i + 1);
      }
      return teams;
    }

    function isPlayer(teams, playerId) {
       return teams.every(function(team) {
        return team.players.every(function(player) {
          return player._id === playerId;
        });
      });

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


    $scope.suppChallenge = function(challengeId) {
      $mdDialog.hide();
      ChallengeService.delete(challengeId).then(function(res) {});
      // $state.go('main.home');

    };

    $scope.changedDate = function(date) {
      $scope.changeDate = date;
    };
    $scope.changedTime = function(time) {
      $scope.changeTime = time;
    };

    $scope.return = function() {
      console.log('ici');
      $state.go('main.home');
    };

    $scope.validChange = function(challengeId) {
      var data = {};

      data.date = $scope.changeDate;
      data.time = $scope.challenge.time;
      data.duration = $scope.challenge.duration;
      data.place = $scope.challenge.place;
      $mdDialog.hide();
      $mdDialog.show({
        contentElement: '#modalLoading',
        scope: $scope,
        controller: 'ResumController',
        preserveScope: true,
        hasBackdrop: false,
        bindToController: true,
        clickOutsideToClose: true,

      });



      ChallengeService.update(challengeId, data).then(function(res) {
        $mdDialog.hide();

        $state.reload();
      });
    };


    $scope.quitChallenge = function(challengeId) {
      $mdDialog.hide();
      TeamService.leaveChallenge({
        challenge: challengeId,
        player: $scope.user._id
      }).then(function(res) {

      });
      $state.go('main.home');
    };


    $scope.valideChoiceTeam = function(teamId) {
      TeamService.changeTeam(teamId, {
        player: $scope.user._id,
        challenge: $scope.challenge._id
      }).then(function(res) {
        $mdDialog.hide();
        $state.go('user.resum', {
          id: $scope.challenge._id
        });
      });
    };


    // service
    ChallengeService.getOne($state.params.id).then(function(res) {
      $scope.teams = nameTeams(res.data.teams);
      $scope.start = res.data.newDate + ' ' + 'à' + ' ' + res.data.newTime;
      $scope.challenge = res.data;
      $scope.challenge.date = new Date($scope.challenge.date);
      $scope.challenge.time = new Date($scope.challenge.time);
      $mdDateLocale.formatDate = function(date) {
        return $filter('date')($scope.challenge.date, "dd-MM-yyyy");
      };


    });

    // TODO: faire nouveau resum avec nouveau controleur
  });
