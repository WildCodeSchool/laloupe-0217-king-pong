angular.module('app')
    .service('ChallengeService', function($http) {
        return {

          create: function(challenge) {
            return $http.post('/challenges/', challenge);
          },

          update: function(id, user) {
              return $http.put('/challenges/' + id, user);
          },
            getAll: function() {
                return $http.get('/challenges');
            },
            getOne: function(id) {
                return $http.get('/challenges/' + id);
            },
        };
    });
