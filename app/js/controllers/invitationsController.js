angular.module('app')
  .controller('InvitationsController', function($scope, $mdDialog, $state, $stateParams, SessionService, InvitationService, TeamService, CurrentUser) {



    // function
    function nameTeams(teams) {
      for (var i = 0; i < teams.length; i++) {
        teams[i].name = (i + 1);
      }
      return teams;
    }

    var info;
    $scope.user = CurrentUser.user();
    $scope.teams = [];
    $scope.team = {};
    $scope.invitations = {};
    $scope.state = $state;

    $scope.showRefusModal = function() {
      $mdDialog.show({
        contentElement: '#modalRefus',
        scope: $scope,
        controller: 'InvitationsController',
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

    // functions
    $scope.valideChoiceTeam = function(id) {
          TeamService.addPlayer(id, {
        players:$scope.user._id,
        challenge: $state.params._id
      }).then(function(res) {
        console.log('coucou',res);
        $state.go('main.home');
      });
    };


    $scope.erase = function(id){

      InvitationService.refuse(
        $state.params.id,
        $scope.user._id
      ).then(function(res) {
      $state.go('main.home');
      });
    };


    $scope.showTeamModal = function(team) {
      console.log($scope.teams);

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
          team: $scope.team,
          teams: $scope.teams
        }
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

    $scope.goToHome = function() {
        $state.go('main.home');
    };

    $scope.quit = function() {
      $mdDialog.hide();
    };

    // service
    InvitationService.getOne($state.params.id).then(function(res) {
      $scope.invitation = res.data;
      $scope.teams=nameTeams(res.data.teams);
      console.log($scope.invitation);
    });


    // res of service exemple

    // challenge: {
    //   _id: 594 aaa772f6bf11d09c0f2fe,
    //   community: 591e d360c2a0f36f30b37c22,
    //   author: 5942 a6f5e630441892a1f6eb,
    //   activity: {
    //     _id: 591e e22dc2a0f36f30b37c2b,
    //     photo: './img/jeuxVideo.jpg',
    //     activityName: 'Tekken',
    //     description: 'Une petite partie de Tekken',
    //     resultRule: 'Gagnant / Perdant',
    //     duration: '25',
    //     __v: 0,
    //     numberOfplayer: 2,
    //     numberOfTeam: 2
    //   },
    //   date: 2017 - 06 - 22 T22: 00: 00.000 Z,
    //   time: 1970 - 01 - 01 T20: 01: 00.000 Z,
    //   duration: '1h30',
    //   place: 'ici',
    //   maxPlayers: 2,
    //   __v: 0,
    //   teams: [{
    //       _id: 594 aaa772f6bf11d09c0f2ff,
    //       players: [Array]
    //     },
    //     {
    //       _id: 594 aaa772f6bf11d09c0f300,
    //       players: []
    //     }
    //   ]
    // }


    // adding player in team

    // TeamService.addPlayer(team._id,{players:player._id, challenge: challenge._id}).then(function(res){
    //   console.log(res);
    // });



    // var id= $stateParams.invitation;
    // console.log(invitation.id);
  });
