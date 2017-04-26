angular.module('app')
    .controller('ActivityDescriptionController', function($scope, $state, $stateParams, ActivityService) {

        $scope.activity = $stateParams.activity;
        $scope.description = "loren sum.....";

        $scope.activity=[];
     ActivityService.getOne().then(function(res){
   $scope.activity = res.data;
   console.log($scope.activity);

 },
 function(err){
   //bad

});

    });
