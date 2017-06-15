angular.module('app')
  .controller('CreateDefisController', function($scope, $state, $stateParams, ActivityService, SessionService, ChallengeService, TeamService, UserService, CurrentUser, CommunityService) {

    //userAgent
    if (navigator.userAgent.match(/(android|iphone|blackberry|symbian|symbianos|symbos|netfront|model-orange|javaplatform|iemobile|windows phone|samsung|htc|opera mobile|opera mobi|opera mini|presto|huawei|blazer|bolt|doris|fennec|gobrowser|iris|maemo browser|mib|cldc|minimo|semc-browser|skyfire|teashark|teleca|uzard|uzardweb|meego|nokia|bb10|playbook)/gi)) {
      $scope.device = (navigator.userAgent.match(/(android|iphone|blackberry|symbian|symbianos|symbos|netfront|model-orange|javaplatform|iemobile|windows phone|samsung|htc|opera mobile|opera mobi|opera mini|presto|huawei|blazer|bolt|doris|fennec|gobrowser|iris|maemo browser|mib|cldc|minimo|semc-browser|skyfire|teashark|teleca|uzard|uzardweb|meego|nokia|bb10|playbook)/gi)).length;
      $scope.device = (navigator.userAgent.match(/(android|iphone|blackberry|symbian|symbianos|symbos|netfront|model-orange|javaplatform|iemobile|windows phone|samsung|htc|opera mobile|opera mobi|opera mini|presto|huawei|blazer|bolt|doris|fennec|gobrowser|iris|maemo browser|mib|cldc|minimo|semc-browser|skyfire|teashark|teleca|uzard|uzardweb|meego|nokia|bb10|playbook)/gi)).length;
    } else {
      $scope.device = [];
    }

    //variables
    var community = $stateParams.community;
    $scope.user = CurrentUser.user();
    $scope.activity = JSON.parse(SessionService.get('activity') || '[]');
    $scope.durations = ["15 mn ", "30mn", "45mn", "1h00", "1h15", "1h30", "1h45", "2h00"];
    $scope.myVarBefore = false;



    //button
    $scope.filterActivity = function() {
      $state.go('user.filterActivity', {
        community: $stateParams.community
      });
    };

    $scope.sendChallenge = function() {
      var Team = [];
      var nbrTeam = $scope.activity.numberOfTeam;
      for (let i = 1; i <= nbrTeam; i++) {
        Team.push([]);
      }

      var infoChallenge = {
        community: community,
        author: $scope.user._id,
        activity: $scope.activity._id,
        date: $scope.myDate,
        time: $scope.startTime,
        duration: $scope.duration,
        place: $scope.lieu,
        maxPlayers: $scope.activity.numberOfplayer,

      };
      var totalInfo = {
        infoChallenge: infoChallenge,
        teams: Team,
        invite: ["58ff7e5aee9fa934131d1e40", "59003d1d65bddb1575f74eed", "590e0e27a3a7f229c97369f3"]
      };

      ChallengeService.create(totalInfo).then((res) => {
        console.log(res);
      });
    };

    $scope.goToHome = function() {
      $state.go('user.home');
    };

    $scope.toggle = function() {
      $scope.myVarBefore = !$scope.myVarBefore;


    };
    $scope.addInvite = function() {
      $scope.invite = [];
      $scope.myVarBefore = true;
      $scope.invite = $scope.communitys.filter(function(users) {

        return users.isChecked;
      });
      $scope.invite = $scope.invite.map(function(users) {

        return users.pseudo;
      });

      $scope.myVarBefore = !$scope.myVarBefore;
      console.log($scope.invite);
    };

    //service
    CommunityService.getOne(community).then(function(res) {
      res.data.users.forEach(function(users) {
        users.check = false;
      });

    });

    // TODO: unset session service when quit create defy

  });
