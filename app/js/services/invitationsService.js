angular.module('app')
    .service('InvitationsService', function($http) {
        return {

          create: function(challenge) {
            return $http.post('/invitations/');
          },

          update: function(id, user) {
              return $http.put('/invitations/' + id, user);
          },
            getAll: function() {
                return $http.get('/invitations');
            },
            getOne: function(id) {
                return $http.get('/invitations/' + id);
            },
            addUser: function(id, user) {
                return $http.put('/invitations/user/' + id, user);
            },
        };
    });
