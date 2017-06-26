angular.module('app')
    .controller('RankController', function($scope, CurrentUser, SharingDataService) {

        $scope.user = CurrentUser.user();

        // $scope.activities = [];
        // $scope.$watch(function() {
        //   return SharingDataService.getScore();
        // }, function(newValue, oldValue) {
        //   $scope.activities = newValue;
        // });
        $scope.activities = [{
                name: "rugby",
                players: [{
                        pseudo: 'nail',
                        _id: 1,
                        avatar: 'x',
                        result: {
                            play: 13,
                            totalpoint: 0,
                            win: 9,
                            nul: 2,
                            lost: 4
                        }
                    },
                    {
                        pseudo: 'fifi',
                        _id: 1,
                        avatar: 'x',
                        result: {
                            play: 13,
                            totalpoint: 0,
                            win: 8,
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
                        avatar: 'x',
                        result: {
                            play: 13,
                            totalpoint: 0,
                            win: 4,
                            nul: 2,
                            lost: 4
                        }
                    },
                    {
                        pseudo: 'nail',
                        _id: 1,
                        avatar: 'x',
                        result: {
                            play: 13,
                            totalpoint: 0,
                            win: 5,
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
                        avatar: 'x',
                        result: {
                            play: 15,
                            totalpoint: 0,
                            win: 6,
                            nul: 2,
                            lost: 4
                        }
                    },
                    {
                        pseudo: 'nail',
                        _id: 1,
                        avatar: 'x',
                        result: {
                            play: 13,
                            totalpoint: 0,
                            win: 9,
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
                        avatar: 'x',
                        result: {
                            play: 13,
                            totalpoint: 0,
                            win: 7,
                            nul: 2,
                            lost: 4
                        }
                    },
                    {
                        pseudo: 'noel',
                        _id: 1,
                        avatar: 'x',
                        result: {
                            play: 11,
                            totalpoint: 0,
                            win: 7,
                            nul: 2,
                            lost: 4
                        }

                    }
                ]
            }
        ];

        console.log('result', $scope.activities[0].players[0].result.totalpoint);


        var newscore = {};
        $scope.activities.forEach(function(activity) {
            for (var i = 0; i < $scope.activities.length; i++) {
                for (var y = 0; y < $scope.activities[i].players.length; y++) {
                    $scope.activities[i].players[y].result.totalpoint = $scope.activities[i].players[y].result.win * 3 + $scope.activities[i].players[y].result.nul * 1;
                }

            }

        });


        console.log($scope.activities);



        $scope.goto = function(name) {
            $scope.filter = name;
        };






    });
