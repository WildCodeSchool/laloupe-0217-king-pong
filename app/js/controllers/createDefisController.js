angular.module('app')
    .controller('CreateDefisController', function($scope, $state, $stateParams, ActivityService, SessionService, ChallengeService, UserService, CurrentUser) {
        $scope.user = CurrentUser.user();
        $scope.activity = JSON.parse(SessionService.get('activity') || '[]');

        $scope.filterActivity = function() {
            $state.go('user.filterActivity');
        };

        $scope.sendChallenge = function() {
          $scope.newChallenge = [];
          var infoChallenge = {
            pseudo : $scope.user._id,
            activity : $scope.activity._id,
            date : $scope.myDate,
            time : $scope.startTime,
            duration : $scope.duration,
            place : $scope.lieu,
            groupe : $scope.activity.numberOfTeam,
            nbrParticipantGroupe : $scope.activity.numberOfplayer,
            invite : $scope.invite

          };
          $scope.newChallenge.push(infoChallenge);
          ChallengeService.create(infoChallenge).then(function(res){
            $state.go('user.filterActivity');
        });

      };

        $scope.durations = [
            "15mn",
            "30mn",
            "45mn",
            "1h00",
            "1h15",
            "1h30",
            "1h45",
            "2h00"
        ];
        $scope.goToHome = function() {
            $state.go('user.home');
        };



    });
