angular.module('app')
    .controller('CreateDefisController', function($scope, $state, $stateParams, ActivityService, SessionService, ChallengeService, TeamService, UserService, CurrentUser, CommunityService) {




        if (navigator.userAgent.match(/(android|iphone|blackberry|symbian|symbianos|symbos|netfront|model-orange|javaplatform|iemobile|windows phone|samsung|htc|opera mobile|opera mobi|opera mini|presto|huawei|blazer|bolt|doris|fennec|gobrowser|iris|maemo browser|mib|cldc|minimo|semc-browser|skyfire|teashark|teleca|uzard|uzardweb|meego|nokia|bb10|playbook)/gi)) {
            $scope.device = (navigator.userAgent.match(/(android|iphone|blackberry|symbian|symbianos|symbos|netfront|model-orange|javaplatform|iemobile|windows phone|samsung|htc|opera mobile|opera mobi|opera mini|presto|huawei|blazer|bolt|doris|fennec|gobrowser|iris|maemo browser|mib|cldc|minimo|semc-browser|skyfire|teashark|teleca|uzard|uzardweb|meego|nokia|bb10|playbook)/gi)).length;
            $scope.device = (navigator.userAgent.match(/(android|iphone|blackberry|symbian|symbianos|symbos|netfront|model-orange|javaplatform|iemobile|windows phone|samsung|htc|opera mobile|opera mobi|opera mini|presto|huawei|blazer|bolt|doris|fennec|gobrowser|iris|maemo browser|mib|cldc|minimo|semc-browser|skyfire|teashark|teleca|uzard|uzardweb|meego|nokia|bb10|playbook)/gi)).length;
        } else {
            $scope.device = [];
        }

        var community = $stateParams.community;
        var players = [];
$scope.currentDate = new Date();


        CommunityService.getOne(community).then(function(res) {
            res.data.users.forEach(function(user) {
                user.check = false;
            });
            $scope.communitys = res.data.users;
            console.log('res community', $scope.communitys);
        });

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
            $state.go('user.filterActivity', {
                community: $stateParams.community
            });
            $scope.activity=[];
        };

        $scope.sendChallenge = function() {

            $scope.newChallenge = [];


            var Team = [];
            var nbrTeam = $scope.activity.numberOfTeam;
            for (var i = 1; i <= nbrTeam; i++) {
                Team.push([]);
                // TeamService.create({
                //     // challenge: res.data._id,
                //     // invite: userP,
                //     players: [],
                //     maxPlayer: nbrPlayer[i]
                // });

            }
            console.log('team', Team);
            var players = [];
            $scope.invite.forEach(function(player){
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
                invite:players

            };


            console.log('max players : ', totalInfo);

            ChallengeService.create(totalInfo);

            sessionStorage.clear();
            $state.go('main.home');

        };
        $scope.goToHome = function() {
            $state.go('main.home');
            sessionStorage.clear();
        };
        $scope.myVarBefore = false;
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

            $scope.invite.forEach(function(player){
              players.push(player._id);

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


        // Model bound to input fields and modal

        // Optional message to display below each input field
        $scope.message = {
          hour: 'Hour is required',
          minute: 'Minute is required',
          meridiem: 'Meridiem is required'
        };

        $scope.readonly = false;

        $scope.required = true;


    // TODO: limit invitation au max player -1 en comptant le créateur du defy
    // TODO: required sur l'ensemble du formulaire pour ne pas envoyer de champ vide
    // TODO: ne pas mettre une date antérieur à celle en cours
    // TODO: le date picker est à la date actuel(facultatif)
    // TODO: supprimer l'author de la liste des inviter

    });
