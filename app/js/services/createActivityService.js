angular.module('app')
  .service('CreateActivityService', function($http) {
    return {
      create: function(infoActivity) {
        return $http.post('/activities/', infoActivity);
      },
      update: function(id, user) {
        return $http.put('/activities/' + id, infoActivity);
      },
      getAll: function() {
        return $http.get('/activities');
      },
      getOne: function(id) {
        return $http.get('/activities/' + id);
      },
    };
  });
