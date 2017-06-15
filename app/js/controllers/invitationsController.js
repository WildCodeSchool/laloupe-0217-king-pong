angular.module('app')
    .controller('InvitationsController', function($scope, $state, $stateParams, ActivityService, SessionService, InvitationsService, ChallengeService, TeamService, UserService, CurrentUser, CommunityService) {


        InvitationsService.getAll().then(function(res) {
          $scope.invitations = res.data;
          console.log($scope.invitations);
        });

// var id= $stateParams.invitation;
// console.log(invitation.id);
    });
