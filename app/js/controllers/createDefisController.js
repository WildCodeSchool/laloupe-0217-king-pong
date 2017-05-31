angular.module('app')
    .controller('CreateDefisController', function($scope, $state, $stateParams, ActivityService, SessionService, ChallengeService, TeamService, UserService, CurrentUser) {
        $scope.user = CurrentUser.user();
        $scope.activity = JSON.parse(SessionService.get('activity') || '[]');

        console.log($scope.activity);
        console.log('nombre de joueurs par équipe : ', $scope.activity.numberOfplayer);




        //
        //
        //          var teams = [];
        //          var player =[];
        //
        //          var nbrPlayer = $scope.activity.numberOfplayer;
        //          console.log('nombre de player', nbrPlayer);
        //          for (i = 1; i <= nbrPlayer; i++) {
        //         // player = player.splice(player.length);
        //         player.push(i);
        //         teams.push(player);
        //
        //         console.log('team', teams);
        // }


        //  sub_array = sub_array.slice(0,sub_array.length);
        //          sub_array.push(i);
        //          super_array.push(sub_array);
        //   teams.push ('team '+i);






        /////////////////////////////////test///////////////////////////


        // console.log('nombre de team', nbrTeam);
        // for (e = 1; e <= nbrTeam; e++) {
        //     teams = teams.splice(teams.length);
        //     allTeams = allTeams.splice(allTeams.length);
        //     // teams.push(i);
        //
        //     allTeams.push(teams);
        //       console.log('all', allTeams );
        //
        // }
        //







        $scope.filterActivity = function() {
            $state.go('user.filterActivity');
        };

        $scope.sendChallenge = function() {

            $scope.newChallenge = [];
            var infoChallenge = {
                pseudo: $scope.user._id,
                activity: $scope.activity._id,
                date: $scope.myDate,
                time: $scope.startTime,
                duration: $scope.duration,
                place: $scope.lieu,
                groupe: $scope.activity.numberOfTeam,
                nbrParticipantGroupe: $scope.activity.numberOfplayer,
                invite: $scope.invite

            };


            $scope.newChallenge.push(infoChallenge);
            $scope.sendChallenge = function() {
                ChallengeService.create(infoChallenge).then(function(res) {
                    var userP = [{
                            id: "1",
                            nom: "nail",
                        },

                        {
                            id: "2",
                            nom: "fifi"
                        },
                    ];
                    var player = [];
                    var nbrPlayer = $scope.activity.numberOfplayer;
                    for (let i = 1; i <= nbrPlayer; i++) {
                        player.push(nbrPlayer[i]);
                    }
                      console.log(player);
                    TeamService.addPlayer(player);


                    var Team = [];
                    var nbrTeam = $scope.activity.numberOfTeam;
                    for(let i = 1; i <= nbrTeam; i++){
                      Team.push(nbrTeam[i]);
                      TeamService.create({
                          challenge: res.data._id,
                          invite: userP,
                          players: [],  
                          maxPlayer:nbrPlayer[i]
                      });
                    }
                    console.log('team', Team);



                    $state.go('user.filterActivity');
                });

            };



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
            $scope.goToHome = function() {
                $state.go('user.home');
            };









            // for (let i = 1; i <= nbrTeam; i++) {
            //   teams.push([]).then function(res){
            //
            //   });
            // };
            // console.log('test team', teams);
            // //
            // for (let i = 1; i<= nbrPlayer; i++) {
            //   allPlayer.push(i);
            // }
            // console.log('test player', allPlayer);
            //






        };
    });
