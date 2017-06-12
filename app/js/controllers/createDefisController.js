angular.module('app')
    .controller('CreateDefisController', function($scope, $state, $stateParams, CommunityService, ActivityService, SessionService, ChallengeService, UserService, CurrentUser) {
        //
        if (navigator.userAgent.match(/(android|iphone|blackberry|symbian|symbianos|symbos|netfront|model-orange|javaplatform|iemobile|windows phone|samsung|htc|opera mobile|opera mobi|opera mini|presto|huawei|blazer|bolt|doris|fennec|gobrowser|iris|maemo browser|mib|cldc|minimo|semc-browser|skyfire|teashark|teleca|uzard|uzardweb|meego|nokia|bb10|playbook)/gi)) {
            $scope.device = (navigator.userAgent.match(/(android|iphone|blackberry|symbian|symbianos|symbos|netfront|model-orange|javaplatform|iemobile|windows phone|samsung|htc|opera mobile|opera mobi|opera mini|presto|huawei|blazer|bolt|doris|fennec|gobrowser|iris|maemo browser|mib|cldc|minimo|semc-browser|skyfire|teashark|teleca|uzard|uzardweb|meego|nokia|bb10|playbook)/gi)).length;
        } else {
            $scope.device = [];
        }
        var community = $stateParams.community;
        CommunityService.getOne(community).then(function(res) {
            res.data.users.forEach(function(user) {
                user.check = false;
            });
            $scope.communitys = res.data.users;

            console.log('res community', $scope.communitys);
        });

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
                invite: [$scope.invites]

            };

            $scope.newChallenge.push(infoChallenge);
            ChallengeService.create(infoChallenge, $scope.invite).then(function(res) {
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

        $scope.myVarBefore = false;
        $scope.toggle = function() {
            $scope.myVarBefore = !$scope.myVarBefore;

        };
        CommunityService.getOne(community).then(function(res) {
            res.data.users.forEach(function(users) {
                users.check = false;
            });
        });
        $scope.addInvite = function() {
            $scope.invite = [];
            $scope.myVarBefore = true;
            $scope.invite = $scope.communitys.filter(users => users.isChecked);
            $scope.invite = $scope.invite.map(users => users.pseudo);
            $scope.myVarBefore = !$scope.myVarBefore;
            console.log($scope.invite);
        };
    });
