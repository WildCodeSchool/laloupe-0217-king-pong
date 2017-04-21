angular.module('app')
    .controller('CreateActivityController', function($scope, $state) {
            $scope.activities = [{
                    activity: 'Foot de rue'
                },
                {
                    activity: 'Tennis'
                },
                {
                    activity: 'Ping-pong'
                },
                {
                    activity: 'Echec'
                },
                {
                    activity: 'Poker'
                },
                {
                    activity: 'Basket'
                }
            ];
              $scope.myActivity = {};
              $scope.champs = function(){

              };

    });
