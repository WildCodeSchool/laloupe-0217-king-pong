angular.module('app')
  .factory('SharingDataService', function() {
    var invitations,arbitrages,playerDefies,communityDefies,scores;

    return {
      sendInvitations: function(data) {
        invitations = data;
      },
      sendArbitrages: function(data) {
        arbitrages = data;
      },
      sendPlayerDefies: function(data) {
        playerDefies = data;
      },
      sendCommunity: function(data) {
        communityDefies = data;
      },
      sendScore: function(data) {
        scores = data;
      },

      getInvitations: function() {
        return invitations;
      },
      getArbitrages: function() {
        return arbitrages;
      },
      getPlayerDefies: function() {
        return playerDefies;
      },
      getCommunity: function() {
        return communityDefies;
      },
      getScore: function() {
        return scores;
      }


    };
  });
