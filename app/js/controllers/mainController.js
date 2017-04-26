angular.module('app')
  .controller('MainController', function($scope, $timeout, $mdSidenav) {



    $('.carousel.carousel-slider').carousel({
      fullWidth: true,
      shift: -150,
      padding: 80,
    });

  });
