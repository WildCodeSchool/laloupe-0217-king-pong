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

            {name:'ping pong',value:'./img/pin-pong.jpg'},
            {name:'foot',value:'./img/foot.jpg'},
            {name:'echec',value:'./img/echec.jpg'},
            {name:'petanque',value:'./petanque.jpg'},
            {name:'basket',value:'./basket.jpg'},
            {name:'sport de plein air',value:'./air.jpg'},
            {name:'sport en salle',value:'./sport_en_salle.jpg'},
            {name:'jeux vidéo',value:'jeuxVideo.jpg'},
            {name:'jeux de societe',value:'jeux_de_societe.jpg'}

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
