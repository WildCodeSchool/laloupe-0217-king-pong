angular.module('app')
  .factory('SharingDataService', function() {
    var community;
    return {
      sendCommunity: function(data) {
        community = data;
      },


      getCommunity: function() {
        return community;
      },
    };
  });
