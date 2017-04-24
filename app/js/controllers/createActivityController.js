var instrumentsControllers = angular.module('app')
    .controller('CreateActivityController', function($scope, $state, $stateParams) {
        $scope.activitiesList = [{
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


        $scope.activity = '';

        $scope.addActivity = function(index) {
            $state.go('user.createDefis', {
                activity: $scope.activitiesList[index].activity
            });
        };
    });
