angular.module('app')
    .controller('RankController', function($scope, CurrentUser, SharingDataService) {

        $scope.user = CurrentUser.user();

        $scope.$watch(function() {
            return SharingDataService.getCommunity();
        }, function(newValue, oldValue) {
            Community = newValue;
        });
        $scope.activities = [{
                name: "rugby",
                players: [{
                        pseudo: 'nail',
                        _id: 1,
                        avatar: 'avatar_en_cours',
                        result: {
                            play: 13,
                            win: 7,
                            nul: 2,
                            lost: 4
                        }
                    },
                    {
                        pseudo: 'fifi',
                        _id: 1,
                        avatar: 'avatar_en_cours',
                        result: {
                            play: 13,
                            win: 7,
                            nul: 2,
                            lost: 4
                        }

                    }
                ]
            },

            {
                name: "foot",
                players: [{
                        pseudo: 'jojo',
                        _id: 1,
                        avatar: 'avatar_en_cours',
                        result: {
                            play: 13,
                            win: 7,
                            nul: 2,
                            lost: 4
                        }
                    },
                    {
                        pseudo: 'nail',
                        _id: 1,
                        avatar: 'avatar_en_cours',
                        result: {
                            play: 13,
                            win: 7,
                            nul: 2,
                            lost: 4
                        }

                    }
                ]
            },
            {
                name: "velo",
                players: [{
                        pseudo: 'fifi',
                        _id: 1,
                        avatar: 'avatar_en_cours',
                        result: {
                            play: 15,
                            win: 7,
                            nul: 2,
                            lost: 4
                        }
                    },
                    {
                        pseudo: 'nail',
                        _id: 1,
                        avatar: 'avatar_en_cours',
                        result: {
                            play: 13,
                            win: 7,
                            nul: 2,
                            lost: 4
                        }

                    }
                ]
            },
            {
                name: "natation",
                players: [{
                        pseudo: 'lili',
                        _id: 1,
                        avatar: 'avatar_en_cours',
                        result: {
                            play: 13,
                            win: 7,
                            nul: 2,
                            lost: 4
                        }
                    },
                    {
                        pseudo: 'noel',
                        _id: 1,
                        avatar: 'avatar_en_cours',
                        result: {
                            play: 11,
                            win: 7,
                            nul: 2,
                            lost: 4
                        }

                    }
                ]
            }
        ];



for (var i = 0; i < $scope.activities.length; i++) {
  console.log("Player "+i, $scope.activities[0].name);
}

$scope.goto = function(name) {
  $scope.filter = name;
}






        $scope.scores = [{

                pseudo: 'nail',
                avatar: 'Avatar',
                point: '',
                play: 13,
                win: 7,
                nul: 2,
                lost: 4
            },
            {
                pseudo: 'fifi',
                avatar: 'Avatar',
                point: '',
                play: 18,
                win: 9,
                nul: 0,
                lost: 0
            },
            {
                pseudo: 'jojo',
                avatar: 'Avatar',
                point: '',
                play: 13,
                win: 7,
                nul: 2,
                lost: 4
            }
        ];

        var Game = $scope.activities;
        var resultatForEachPlayer = [];

        Game.forEach(function(activity){
          function containsPlayer(player, list){
            for (var i = 0; i < Game.length; i++) {
              if (Game[i] === player){
                console.log("player is already on you list");
              }
            }
            resultatForEachPlayer.push( list[i]);
          }
        });


        // var players = $scope.scores;
        //// var players = $scope.scores;
        //
        // players.forEach(function(player){
        //   player.point = player.win * 3 + player.nul * 1 ;
        // });
        //
        // ChallengeService.getScoreByCommunity(id).then(function(res){
        //   console.log(res.data);
        //   $scope.scores =res.data[0];
        // });
        //
        // var resultatForEachPlayer = [];
        //
        // res.data.forEach(function(activity){
        //   function containsPlayer(player, list){
        //     for (var i = 0; i < list.length; i++) {
        //       if (list[i] === player){
        //         console.log("player is already on you list");
        //       }
        //     }
        //     resultatForEachPlayer.push( list[i]);
        //   }
        // });
        // players.forEach(function(player){
        //   player.point = player.win * 3 + player.nul * 1 ;
        // });
        //
        // ChallengeService.getScoreByCommunity(id).then(function(res){
        //   console.log(res.data);
        //   $scope.scores =res.data[0];
        // });
        //

    });
