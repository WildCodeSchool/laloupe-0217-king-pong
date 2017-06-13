angular.module('app')
    .controller('CreateDefisController', function($scope, $state, $stateParams, ActivityService, SessionService, ChallengeService, TeamService, UserService, CurrentUser) {
        $scope.user = CurrentUser.user();
        $scope.activity = JSON.parse(SessionService.get('activity') || '[]');


        var community = "59147355f7648274a0c270e8";

        console.log('nombre de joueurs par équipe : ', $scope.activity.numberOfplayer);
        console.log('nombre d\'équipe : ', $scope.activity.numberOfTeam);
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

        $scope.filterActivity = function() {
            $state.go('user.filterActivity');
        };

        $scope.sendChallenge = function() {

            $scope.newChallenge = [];


            var Team = [];
            var nbrTeam = $scope.activity.numberOfTeam;
            for (let i = 1; i <= nbrTeam; i++) {
                Team.push([]);
                // TeamService.create({
                //     // challenge: res.data._id,
                //     // invite: userP,
                //     players: [],
                //     maxPlayer: nbrPlayer[i]
                // });

            }
            console.log('team', Team);

            $scope.newChallenge.push(infoChallenge);
            var player = [];
            var nbrPlayer = $scope.activity.numberOfplayer;
            for (let i = 1; i <= nbrPlayer; i++) {
                player.push(nbrPlayer[i]);
            }
              console.log('PLayer : ', player);


              var infoChallenge = {
                community:community,
                pseudo: $scope.user.pseudo,
                activity: $scope.activity._id,
                date: $scope.myDate,
                time: $scope.startTime,
                duration: $scope.duration,
                place: $scope.lieu,
                maxPlayers:$scope.activity.numberOfplayer,
              };
              var totalInfo = {
            infoChallenge : infoChallenge,
                teams : Team,

                // players : player
              };

              console.log('max players : ', totalInfo);


            ChallengeService.create(totalInfo);
            // .then(function(res) {
        //         var userP = [{
        //                 id: "1",
        //                 nom: "nail",
        //             },
        //
        //             {
        //                 id: "2",
        //                 nom: "fifi"
        //             },
        //         ];
        //
        //         $state.go('user.filterActivity');
        //     });
        // };
        // $scope.navigateTo = function() {
        //     $state.go('user.invite', {
        //         community: $scope.community
        //     });
        };
    });
