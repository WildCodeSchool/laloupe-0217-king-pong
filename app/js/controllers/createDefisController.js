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
    $scope.invite = [];



    //button
    $scope.filterActivity = function() {
      $state.go('user.filterActivity', {
        community: $stateParams.community
      });
    };

    $scope.sendChallenge = function() {
      var team = [];
      var nbrTeam = $scope.activity.numberOfTeam;
      for (var i = 1; i <= nbrTeam; i++) {
        team.push([]);
      }
      var guest = [];
      $scope.invite.forEach(function(user){
        guest.push(user._id);
      });

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
        teams: team,
        invite: guest
      };

      ChallengeService.create(totalInfo).then(function(res){
        console.log(res);
      });
      $state.go('main.home');
    };

    $scope.goToHome = function() {
      $state.go('main.home');
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

        return users;
      });

      $scope.myVarBefore = !$scope.myVarBefore;
      console.log($scope.invite);
    };

    //service
    CommunityService.getOne(community).then(function(res) {
      console.log(res);
      res.data.users.forEach(function(users) {
        users.check = false;
      });
      $scope.communitys = res.data.users;

    });

    // TODO: unset sessionservice when quit create defy
    // TODO: limit invitation au max player -1 en comptant le créateur du defy
    // TODO: required sur l'ensemble du formulaire pour ne pas envoyer de champ vide
    // TODO: ne pas mettre une date antérieur à celle en cours
    // TODO: le date picker est à la date actuel(facultatif)
    // TODO: supprimer l'author de la liste des inviter

  });
