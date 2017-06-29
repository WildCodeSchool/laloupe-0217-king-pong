angular.module('app')
    .controller('RankController', function($scope, CurrentUser, SharingDataService) {

        $scope.user = CurrentUser.user();
        //
        // $scope.activities = [];
        // $scope.$watch(function() {
        //   return SharingDataService.getScore();
        // }, function(newValue, oldValue) {
        //   $scope.activities = newValue;
        // });

        // $scope.activities = [{
        //         name: "rugby",
        //         players: [{
        //                 pseudo: 'nail',
        //                 _id: 1,
        //                 avatar: 'x',
        //                 result: {
        //                     play: 13,
        //                     totalpoint: 0,
        //                     win: 9,
        //                     nul: 2,
        //                     lost: 4
        //                 }
        //             },
        //             {
        //                 pseudo: 'fifi',
        //                 _id: 2,
        //                 avatar: 'x',
        //                 result: {
        //                     play: 13,
        //                     totalpoint: 0,
        //                     win: 8,
        //                     nul: 2,
        //                     lost: 4
        //                 }
        //
        //             }
        //         ]
        //     },
        //
        //     {
        //         name: "foot",
        //         players: [{
        //                 pseudo: 'jojo',
        //                 _id: 3,
        //                 avatar: 'x',
        //                 result: {
        //                     play: 13,
        //                     totalpoint: 0,
        //                     win: 4,
        //                     nul: 2,
        //                     lost: 4
        //                 }
        //             },
        //             {
        //                 pseudo: 'nail',
        //                 _id: 1,
        //                 avatar: 'x',
        //                 result: {
        //                     play: 13,
        //                     totalpoint: 0,
        //                     win: 5,
        //                     nul: 2,
        //                     lost: 4
        //                 }
        //
        //             }
        //         ]
        //     },
        //     {
        //         name: "velo",
        //         players: [{
        //                 pseudo: 'fifi',
        //                 _id: 2,
        //                 avatar: 'x',
        //                 result: {
        //                     play: 15,
        //                     totalpoint: 0,
        //                     win: 6,
        //                     nul: 2,
        //                     lost: 4
        //                 }
        //             },
        //             {
        //                 pseudo: 'nail',
        //                 _id: 1,
        //                 avatar: 'x',
        //                 result: {
        //                     play: 13,
        //                     totalpoint: 0,
        //                     win: 9,
        //                     nul: 2,
        //                     lost: 4
        //                 }
        //
        //             }
        //         ]
        //     },
        //     {
        //         name: "natation",
        //         players: [{
        //                 pseudo: 'lili',
        //                 _id: 4,
        //                 avatar: 'x',
        //                 result: {
        //                     play: 13,
        //                     totalpoint: 0,
        //                     win: 7,
        //                     nul: 2,
        //                     lost: 4
        //                 }
        //             },
        //             {
        //                 pseudo: 'noel',
        //                 _id: 5,
        //                 avatar: 'x',
        //                 result: {
        //                     play: 11,
        //                     totalpoint: 0,
        //                     win: 7,
        //                     nul: 2,
        //                     lost: 4
        //                 }
        //
        //             }
        //         ]
        //     }
        // ];




        var newscore = {};
        var generalTable = [];

        function calculate(activities, callback) {
            for (var i = 0; i < activities.length; i++) {
                for (var y = 0; y < activities[i].players.length; y++) {
                    activities[i].players[y].result.totalpoint = activities[i].players[y].result.win * 3 + activities[i].players[y].result.nul * 1;
                }

            }
            callback(activities);
        }

        function general(activities) {
          activities.forEach(function (activity) {
            activity.players.forEach(function (player) {
              var index = generalTable.map(function (player) { return player._id;}).indexOf(player._id);
              if (index >= 0) {
                generalTable[index].result.totalpoint += player.result.totalpoint;
                generalTable[index].result.win += player.result.win;
                generalTable[index].result.nul += player.result.nul;
                generalTable[index].result.lost += player.result.lost;
                generalTable[index].result.play += player.result.play;
              } else {
                generalTable.push(player);
              }
            });
          });
        }


        //ici la fonction est réutilisable dans tout le controller


        calculate($scope.activities, general);

        console.log($scope.activities);
        console.log("general", generalTable);





        $scope.goto = function(name) {
            $scope.filter = name;
        };
        //   var generalTable=[]
        //
        // $scope.activitiesGeneral.forEach(function(score){
        //   for (var i = 0; i < activities.length; i++) {
        //     activities[i]
        //   }
        // })





    });
