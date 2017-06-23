angular.module('app')
    .controller('CreateNewActivityController', function($scope, $state, $stateParams, CreateActivityService, SessionService) {

        $scope.navigateBefore = function() {
            $state.go('user.filterActivity',{community:$stateParams.community});
        };
        $scope.resultRules = [
            'Gagnant / Perdant',
            'Gagnant / Match nul / Perdant'
        ];
        $scope.photos = [
            {name:'ping pong',value:'ping-pong'},
            {name:'foot',value:'foot'},
            {name:'echec',value:'echec'},
            {name:'petanque',value:'petanque'},
            {name:'basket',value:'basket'},
            {name:'sport de plein air',value:'air'},
            {name:'sport en salle',value:'sport_en_salle'},
            {name:'jeux vidéo',value:'jeuxVideo'},
            {name:'jeux de societe',value:'jeux_de_societe'}
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
                $state.go('user.filterActivity',{community:$stateParams.community});
            });
        };
    });
