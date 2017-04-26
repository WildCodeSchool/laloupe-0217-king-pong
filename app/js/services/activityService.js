angular.module('app')
    .service('ActivityService', function($http) {
        return {
          update: function(id, user) {
              return $http.put('/activity/' + id, user);
          },
            getAll: function() {
                return $http.get('/activity');
            },
            getOne: function(id) {
                return $http.get('/activity/' + id);
            },
        };
    });
