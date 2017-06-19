angular.module('app')
  .factory('SharingDataService', function() {
    var community,
        numberA,
        numberB;

    return {
      sendCommunity: function(data) {
        community = data;
      },

      getCommunity: function() {
        return community;
      },

      sendSumA: function(data){
        numberA = data;
      },

      sendSumB: function(data){
        numberB = data;
      },

      getSum: function(){
        return numberA + numberB;
      }
    };
  });
