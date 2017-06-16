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
            getByUser: function(params) {
                return $http.get('/challenges/user/',{params:params});
            },
            getOne: function(id) {
                return $http.get('/challenges/' + id);
            },
            addUser: function(id, user) {
                return $http.put('/challenges/user/' + id, user);
            },
        };
    });
