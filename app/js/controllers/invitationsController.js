angular.module('app')
  .controller('InvitationsController', function($scope, $mdDialog, $state, $stateParams, SessionService, InvitationService, TeamService, CurrentUser) {

    // service
    InvitationService.getOne($state.params.id).then(function(res) {
      $scope.invitations = res.data;
      console.log($scope.invitations);
    });

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

    // functions
    $scope.choiceTeam = function(id) {
      var team = {
        _id: "5953b9e45e20587c99da9215"
      };
      var players = {
        _id: "5942a6f5e630441892a1f6eb"
      };
      var challenge = {
        _id: "5953b9e45e20587c99da9214"
      };
      TeamService.addPlayer(team._id, {
        players: players._id,
        challenge: challenge._id
      }).then(function(res) {
        console.log(res);
      });
    };


    $scope.erase = function(id){
      var players = {
        _id: "5942a6f5e630441892a1f6eb"
      };
      var challenge = {
        _id: "5953b9e45e20587c99da9214"
      };
      InvitationService.refuse(
        challenge._id,
        players._id
      ).then(function(res) {
        console.log(res);
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

    $scope.goToHome = function() {
        $state.go('main.home');
    };

    $scope.quit = function() {
      $mdDialog.hide();
    };



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
