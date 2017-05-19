angular.module('app')
    .controller('CreateNewActivityController', function($scope, $state, $stateParams, CreateActivityService, SessionService) {

        $scope.navigateBefore = function() {
            $state.go('user.filterActivity');
        };
        $scope.resultRules = [
            'Gagnant / Perdant',
            'Gagnant / Match nul / Perdant'
        ];
        $scope.photos = [
            'foot',
            'echec',
            'petanque',
            'basket',
            'sport_de_plein_air',
            'sport en salle',
            'activite_de_plein_air',
            'jeux_de_societe'
            ];
        $scope.valide = function() {
            $scope.newActivity = [];
            var infoActivity = {
                photo: $scope.photo,
                activityName: $scope.activity,
                description: $scope.description,
                resultRule: $scope.resultRule,
                numberOfTeam: $scope.teamNumber,
                numberOfplayer: $scope.playerNumber,
                duration: $scope.averageLast
            };
            $scope.newActivity.push(infoActivity);
            console.log($scope.newActivity);
            CreateActivityService.create(infoActivity).then(function(res) {
                $state.go('user.filterActivity');
            });
        };
    });
