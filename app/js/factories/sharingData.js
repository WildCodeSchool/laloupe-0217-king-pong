angular.module('app')
    .factory('SharingDataService', function() {
      var invitations,arbitrages,playerDefies,community;
        return {
            sendInvitations: function(invit) {
              invitations = invit;
            },
            sendArbitrages: function(arbit) {
              arbitrages = arbit;
            },
            sendPlayerDefies: function(player) {
              playerDefies = player;
            },
            sendInCommunity: function(commun) {
              community = commun;
            },
            getInvitations: function() {
              return invitations  ;
            },
            getArbitrages: function() {
              return arbitrages  ;
            },
            getPlayerDefies: function() {
              return playerDefies ;
            },
            getCommunity: function() {
              return community  ;
            },


        };
    });
