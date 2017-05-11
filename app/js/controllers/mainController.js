angular.module('app')
  .controller('MainController', function($scope, $timeout, $mdSidenav, CategoryService) {



    $('.carousel.carousel-slider').carousel({
      fullWidth: true,
      shift: -150,
      padding: 80,
    });

    $scope.categories = [];

            CategoryService.getAll().then(function(res){
              console.log(res.data);
              $scope.categories = res.data;
            });


    $scope.goToInvitation = function(id){
      $state.go("user.challenge",{id:$scope.challenge[id]._id});
    };
  });
