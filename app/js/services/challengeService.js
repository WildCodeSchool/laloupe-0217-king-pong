angular.module('app')
    .service('ChallengeService', function($http) {
        return {



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
