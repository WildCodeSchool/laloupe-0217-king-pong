angular.module('app')
    .controller('RankController', function($scope, CurrentUser) {
        $scope.user = CurrentUser.user();



        $scope.scores = [{

            pseudo: 'nail',
            avatar: 'encour',
            classement: 2,
            point: 5,
            play: 13,
            win: 7,
            nul: 2,
            lost: 4
        },
        {
            pseudo: 'fifi',
            avatar: 'encour',
            classement: 1,
            point: 5,
            play: 18,
            win: 9,
            nul: 0,
            lost: 0
        },
        {
            pseudo: 'jojo',
            avatar: 'encour',
            classement: 3,
            point: 5,
            play: 13,
            win: 7,
            nul: 2,
            lost: 4
        }];

var scores = $scope.scores;



  for (var i = 0; i < scores.length; i++) {
  return scores[i].classement;

}


    });
