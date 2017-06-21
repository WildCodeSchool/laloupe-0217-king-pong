angular.module('app')
    .controller('RankController', function($scope, CurrentUser) {
        $scope.user = CurrentUser.user();

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

var players = $scope.scores;

players.forEach(function(player){
  player.point = player.win * 3 + player.nul * 1 ;
});

console.log('Après for Each : ', players);

});
