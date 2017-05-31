angular.module('app')
    .controller('CreateDefisController', function($scope, $state, $stateParams, ActivityService, SessionService, ChallengeService, UserService, CurrentUser) {
//
      if (navigator.userAgent.match(/(android|iphone|blackberry|symbian|symbianos|symbos|netfront|model-orange|javaplatform|iemobile|windows phone|samsung|htc|opera mobile|opera mobi|opera mini|presto|huawei|blazer|bolt|doris|fennec|gobrowser|iris|maemo browser|mib|cldc|minimo|semc-browser|skyfire|teashark|teleca|uzard|uzardweb|meego|nokia|bb10|playbook)/gi)) {
        $scope.device = (navigator.userAgent.match(/(android|iphone|blackberry|symbian|symbianos|symbos|netfront|model-orange|javaplatform|iemobile|windows phone|samsung|htc|opera mobile|opera mobi|opera mini|presto|huawei|blazer|bolt|doris|fennec|gobrowser|iris|maemo browser|mib|cldc|minimo|semc-browser|skyfire|teashark|teleca|uzard|uzardweb|meego|nokia|bb10|playbook)/gi)).length
        ;
      } else {
          $scope.device=[];
      }

console.log($scope.device);
        $scope.community = $stateParams.community;

        $scope.user = CurrentUser.user();
        $scope.activity = JSON.parse(SessionService.get('activity') || '[]');

        $scope.filterActivity = function() {
            $state.go('user.filterActivity');
        };


        $scope.sendChallenge = function() {
            $scope.newChallenge = [];
            var infoChallenge = {
                pseudo: $scope.user._id,
                activity: $scope.activity._id,
                date: $scope.myDate,
                time: $scope.startTime,
                duration: $scope.duration,
                place: $scope.lieu,
                groupe: $scope.activity.numberOfTeam,
                nbrParticipantGroupe: $scope.activity.numberOfplayer,
                // invite: [$scope.invite]

            };

            $scope.newChallenge.push(infoChallenge);
            ChallengeService.create(infoChallenge,$scope.invite).then(function(res) {
                $state.go('user.home');
                sessionStorage.clear();
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

        $scope.navigateTo = function() {
            $state.go('user.invite', {community: $scope.community});
        };

    });
