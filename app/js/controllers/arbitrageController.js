angular.module('app')
  .controller('ArbitrageController', function($scope,$mdDialog, $state, CurrentUser, ChallengeService, TeamService) {
    // variables
    $scope.user = CurrentUser.user();
    $scope.teams = [];
    $scope.team = {};


    // function
    function nameTeams(teams) {
      for (var i = 0; i < teams.length; i++) {
        teams[i].name = (i + 1);
      }
      return teams;
    }

    $scope.showModal = function(){
      console.log('ici');
      $mdDialog.show({
        template:
        '<md-dialog >'+
          '<md-dialog-content>'+
            '<div class="row" style="margin-top:50px">'+
              '<div class="col s12 offset-l4 l4">'+
                '<div class="input-field col offset-s1 s11 offset-l1 l10 margeTeam">'+
                  '<md-list-item id='+ '{{team.name}}' +' class="col s12 greyBorder teamArbitrage" ng-repeat="team in challenge.teams">'+
                    '<label for="{{team.name}}" class="active">team {{team.name}}</label class ="active">'+
                    '<div class="chip inlineInvite" ng-repeat="player in team.players">'+
                      '<img src="{{player.avatar}}" alt="Contact Person"> {{player.pseudo}}'+
                    '</div>'+
                  '</md-list-item>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</md-dialog-content>'+
          '<md-dialog-content>'+
            '<div class="row">'+
              '<div class=" col offset-s1 s9 offset-l1 l10 ">'+
                '<md-dialog-actions>'+
                  '<div class=" col offset-s1 s9 offset-l1 l10 ">'+
                    '<md-select placeholder="choisir le gagnant" ng-model="team">'+
                      '<md-option ng-repeat="team in teams" value="{{team}}">Equipe {{team.name}}</md-option>'+
                      '<md-option value="null"> Match nul</md-option>'+
                    '</md-select>'+
                  '</div>'+
                '</md-dialog-actions>'+
              '</div>'+
            '</div>'+
          '</md-dialog-content>'+
          '<md-dialog-content>'+
              '<div class="row">'+
                '<div class="col s12">'+
                  '<div class=" ">'+
                    '<button class="btn blue darken-1" type="button" ng-click="choice(team)"><span>Arbitrer</span></button>'+
                '</div>'+
              '</div>'+
            '</div>'+
        '</md-dialog-content>'+
        '</md-dialog>',
         scope:$scope,
         controller: 'ArbitrageController',

      });
    };

    $scope.choice = function(team){
      $scope.valide = JSON.parse(team);
      $scope.team = JSON.parse(team);
      $mdDialog.show({
        template:
        '<md-dialog >'+
          '<md-dialog-content>'+
            '<div class="row" style="margin-top:50px">'+
              '<div class="col s12 offset-l4 l4">'+
                '<p> Vous avez Choisie</p>'+
                  '<b>{{team}}</b>'+
              '</div>'+
            '</div>'+
          '</md-dialog-content>'+
          '<md-dialog-content>'+
          '<md-dialog-actions>'+
              '<div class="row">'+
                '<div class="col s6">'+
                  '<div class=" ">'+
                    '<button class="btn blue darken-1" type="button" ng-click="valideScore(valide)"><span>valider</span></button>'+
                '</div>'+
              '</div>'+
                '<div class="col s6">'+
                  '<div class=" ">'+
                    '<button class="btn blue darken-1" type="button" ng-click="showModal(teams)"><span>retour</span></button>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '</md-dialog-actions>'+

        '</md-dialog-content>'+
        '</md-dialog>',
         scope:$scope,
         controller: 'ArbitrageController',

      });


    };

    $scope.goToHome = function(){
      $state.go('main.home');
    };

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
