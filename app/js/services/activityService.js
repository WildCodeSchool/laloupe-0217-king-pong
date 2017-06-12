angular.module('app')
    .service('ActivityService', function($http) {
        return {
          update: function(id, user) {
              return $http.put('/activities/' + id, user);
          },
            getAll: function() {
                return $http.get('/activities');
            },
            getOne: function(id) {
                return $http.get('/activities/' + id);
            },
        };
    });
