angular.module('app')
    .controller('RankController', function($scope, CurrentUser, SharingDataService) {
        $scope.user = CurrentUser.user();

        $scope.$watch(function(){
          return SharingDataService.getCommunity();
        }, function(newValue, oldValue){ Community = newValue;
        });

        $scope.scores = [{

            pseudo: 'nail',
            avatar: 'Avatar',
            point:'',
            play: 13,
            win: 7,
            nul: 2,
            lost: 4
        },
        {
            pseudo: 'fifi',
            avatar: 'Avatar',
            point:'',
            play: 18,
            win: 9,
            nul: 0,
            lost: 0
        },
        {
            pseudo: 'jojo',
            avatar: 'Avatar',
            point:'',
            play: 13,
            win: 7,
            nul: 2,
            lost: 4
        }];

        function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}

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

});
