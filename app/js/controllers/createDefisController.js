angular.module('app')
  .controller('CreateDefisController', function($scope, $mdDateLocale, $mdDialog, $filter, $state, $stateParams, ActivityService, SessionService, ChallengeService, TeamService, UserService, CurrentUser, CommunityService) {

    if (navigator.userAgent.match(/(android|iphone|blackberry|symbian|symbianos|symbos|netfront|model-orange|javaplatform|iemobile|windows phone|samsung|htc|opera mobile|opera mobi|opera mini|presto|huawei|blazer|bolt|doris|fennec|gobrowser|iris|maemo browser|mib|cldc|minimo|semc-browser|skyfire|teashark|teleca|uzard|uzardweb|meego|nokia|bb10|playbook)/gi)) {
      $scope.device = (navigator.userAgent.match(/(android|iphone|blackberry|symbian|symbianos|symbos|netfront|model-orange|javaplatform|iemobile|windows phone|samsung|htc|opera mobile|opera mobi|opera mini|presto|huawei|blazer|bolt|doris|fennec|gobrowser|iris|maemo browser|mib|cldc|minimo|semc-browser|skyfire|teashark|teleca|uzard|uzardweb|meego|nokia|bb10|playbook)/gi)).length;
      $scope.device = (navigator.userAgent.match(/(android|iphone|blackberry|symbian|symbianos|symbos|netfront|model-orange|javaplatform|iemobile|windows phone|samsung|htc|opera mobile|opera mobi|opera mini|presto|huawei|blazer|bolt|doris|fennec|gobrowser|iris|maemo browser|mib|cldc|minimo|semc-browser|skyfire|teashark|teleca|uzard|uzardweb|meego|nokia|bb10|playbook)/gi)).length;
    } else {
      $scope.device = [];
    }


    // variables
    var community = $stateParams.community;
    var players = [];
    var maxPlayers;
    $scope.myVarBefore = false;
    $scope.myDate = new Date();
    $scope.currentDate = new Date();
    $scope.user = CurrentUser.user();
    $scope.array = [];
    $scope.readonly = false;
    $scope.required = true;
    $scope.activity = JSON.parse(SessionService.get('activity') || '[]');
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
    $scope.message = {
      hour: 'Hour is required',
      minute: 'Minute is required',
      meridiem: 'Meridiem is required'
    };

    console.log($scope.activity);
    if($scope.activity){
      maxPlayers = $scope.activity.numberOfTeam * $scope.activity.numberOfplayer;

    }

    $scope.filterActivity = function() {
      $state.go('user.filterActivity', {
        community: $stateParams.community
      });
      $scope.activity = [];
    };


    $scope.sendChallenge = function() {
      $scope.newChallenge = [];
      var Team = [];
      var nbrTeam = $scope.activity.numberOfTeam;
      for (var i = 1; i <= nbrTeam; i++) {
        Team.push([]);
      }
      var players = [];
      $scope.invite.forEach(function(player) {
        players.push(player._id);
      });
      var infoChallenge = {
        community: community,
        author: $scope.user._id,
        pseudo: $scope.user.pseudo,
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
        invite: players
      };
      ChallengeService.create(totalInfo).then(function(res) {});
      $scope.array = [];
      sessionStorage.clear();
      $state.go('main.home');
    };


    $scope.goToHome = function() {
      $state.go('main.home');
      sessionStorage.clear();
    };


    $scope.toggle = function() {
      $scope.myVarBefore = !$scope.myVarBefore;
    };


    $scope.check = function(checked, userId) {

      if ($scope.array.length < maxPlayers - 2) {
        if (checked) {
          $scope.array.push(userId);


        } else {
          $scope.array.splice($scope.array.indexOf(userId), 1);
        }

      } else {
        $scope.array.splice($scope.array.indexOf(userId), 1);

        $mdDialog.show({
          contentElement: '#modalMax',
          scope: $scope,
          controller: 'CreateDefisController',
          preserveScope: true,
          hasBackdrop: false,
          bindToController: true,
          clickOutsideToClose: true,
          locals: {
            team: $scope.team
          }
        });
      }
    };


    $scope.addInvite = function() {
      $mdDialog.hide();

      $scope.invite = [];
      $scope.myVarBefore = true;
      $scope.invite = $scope.communitys.filter(function(users) {
        return users.isChecked;
      });


      $scope.invite = $scope.invite.map(function(users) {
        return users;
      });


      $scope.invite.forEach(function(player) {
        players.push(player._id);
      });
      $scope.myVarBefore = !$scope.myVarBefore;
    };

    //service
    CommunityService.getOne(community).then(function(res) {
      res.data.users.forEach(function(users) {
        users.check = false;
      });
      $scope.communitys = res.data.users;
    });


    $mdDateLocale.formatDate = function(date) {
      return $filter('date')($scope.myDate, "dd-MM-yyyy");
    };
  });
