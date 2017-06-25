angular.module('app')
  .service('ChallengeService', function($http) {
    return {

      create: function(challenge) {
        return $http.post('/challenges/', challenge);
      },
      update: function(id, data) {
        return $http.put('/challenges/' + id, data);
      },
      getAll: function() {
        return $http.get('/challenges');
      },
      getByUser: function(params) {
        return $http.get('/challenges/user/', {
          params: params
        });
      },
      getByCommunity: function(community) {
        return $http.get('/challenges/community/' + community);
      },
      getScoreByCommunity: function(community) {
        return $http.get('/challenges/score/' + community);
      },
      getOne: function(id) {
        return $http.get('/challenges/' + id);
      },
    };
  });
