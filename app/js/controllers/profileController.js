angular.module('app')
    .controller('ProfileController', function($scope,$state, CurrentUser, CommunityService, UserService) {

        var userId = CurrentUser.user()._id;
        console.log( CurrentUser.user().pseudo);

        $scope.close = function() {
            $state.go('main.home');
        };

        $scope.user = CurrentUser.user();
        $scope.pseudo = CurrentUser.user().pseudo;
        $scope.avatar = CurrentUser.user().avatar;
        $scope.email = CurrentUser.user().email;
        $scope.point = 'points';

        $scope.communitys = [];

        UserService.getOne(userId).then(function(res) {
            $scope.communitys = res.data.community;
            $scope.community = $scope.communitys[($scope.communitys.length - 1)];
        });
        $scope.infoUpdate = function(){

          var infouser ={
            pseudo: $scope.pseudo,
            email: $scope.email
          };

          UserService.update(userId, infouser).then(function(res) {
            console.log(res.data);

                });

          };

    });
