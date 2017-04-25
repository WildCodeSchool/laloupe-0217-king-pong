angular.module('app')
    .controller('ActivityDescriptionController', function($scope, $state, $stateParams) {


        $scope.activity = "";

        $scope.activity = $stateParams.activity;
        $scope.description = "loren sum.....";

    });
