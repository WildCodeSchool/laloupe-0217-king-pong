angular.module('app')
  .controller('CreateDefisController', function($scope, $state, $stateParams, ActivityService, SessionService, ChallengeService, TeamService, UserService, CurrentUser, CommunityService) {


    if (navigator.userAgent.match(/(android|iphone|blackberry|symbian|symbianos|symbos|netfront|model-orange|javaplatform|iemobile|windows phone|samsung|htc|opera mobile|opera mobi|opera mini|presto|huawei|blazer|bolt|doris|fennec|gobrowser|iris|maemo browser|mib|cldc|minimo|semc-browser|skyfire|teashark|teleca|uzard|uzardweb|meego|nokia|bb10|playbook)/gi)) {
      $scope.device = (navigator.userAgent.match(/(android|iphone|blackberry|symbian|symbianos|symbos|netfront|model-orange|javaplatform|iemobile|windows phone|samsung|htc|opera mobile|opera mobi|opera mini|presto|huawei|blazer|bolt|doris|fennec|gobrowser|iris|maemo browser|mib|cldc|minimo|semc-browser|skyfire|teashark|teleca|uzard|uzardweb|meego|nokia|bb10|playbook)/gi)).length;
      $scope.device = (navigator.userAgent.match(/(android|iphone|blackberry|symbian|symbianos|symbos|netfront|model-orange|javaplatform|iemobile|windows phone|samsung|htc|opera mobile|opera mobi|opera mini|presto|huawei|blazer|bolt|doris|fennec|gobrowser|iris|maemo browser|mib|cldc|minimo|semc-browser|skyfire|teashark|teleca|uzard|uzardweb|meego|nokia|bb10|playbook)/gi)).length;
    } else {
      $scope.device = [];
    }

    var community = $stateParams.community;

    $scope.user = CurrentUser.user();
    $scope.activity = JSON.parse(SessionService.get('activity') || '[]');



    // var community = "59147355f7648274a0c270e8";

    console.log('nombre de joueurs par équipe : ', $scope.activity.numberOfplayer);
    console.log('nombre d\'équipe : ', $scope.activity.numberOfTeam);
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

    $scope.filterActivity = function() {
      $state.go('user.filterActivity',{community:$stateParams.community});
    };

    $scope.sendChallenge = function() {

      $scope.newChallenge = [];


      var Team = [];
      var nbrTeam = $scope.activity.numberOfTeam;
      for (let i = 1; i <= nbrTeam; i++) {
        Team.push([]);
        // TeamService.create({
        //     // challenge: res.data._id,
        //     // invite: userP,
        //     players: [],
        //     maxPlayer: nbrPlayer[i]
        // });

      }
      console.log('team', Team);

      $scope.newChallenge.push(infoChallenge);
      var player = [];
      var nbrPlayer = $scope.activity.numberOfplayer;
      for (let i = 1; i <= nbrPlayer; i++) {
        player.push(nbrPlayer[i]);
      }
      console.log('PLayer : ', player);


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

        invite:["58ff7e5aee9fa934131d1e40","59003d1d65bddb1575f74eed","590e0e27a3a7f229c97369f3"]

      };

      console.log('max players : ', totalInfo);


      ChallengeService.create(totalInfo);


    };
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
      $scope.invite = $scope.communitys.filter(function(users) {

        return users.isChecked;
      });
      $scope.invite = $scope.invite.map(function(users) {

        return users.pseudo;
      });

      $scope.myVarBefore = !$scope.myVarBefore;
      console.log($scope.invite);
    };


  });
