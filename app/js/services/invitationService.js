angular.module('app')
    .service('InvitationService', function($http) {
        return {
            create: function(id) {
                return $http.post('/invitations/'+ id);
            },
            getAll: function() {
                return $http.get('/invitations/');
            },
            getOne: function(challenge) {
                return $http.get('/invitations/' + challenge);
            },
            getByUser: function(params) {
                return $http.get('/invitations/user/' ,{params:params});
            },
            update: function(id, user) {
                return $http.put('/invitations/' + id, user);
            },
            addUser: function(id, user) {
                return $http.put('/invitations/user/' + id, user);
            },
            delete: function(id) {
                return $http.delete('/invitations/' + id);
            }
        };
    });
