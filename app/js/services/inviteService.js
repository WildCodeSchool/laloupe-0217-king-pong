angular.module('app')
    .service('InviteyService', function($http) {
        return {
            create: function(infoCommunity) {
                return $http.post('/invite/', infoCommunity);
            },
            getAll: function() {
                return $http.get('/invite/');
            },
            getOne: function(id) {
                return $http.get('invite/' + id);
            },
            update: function(id, user) {
                return $http.put('/invites/' + id, user);
            },
            addUser: function(id, user) {
                return $http.put('/invite/user/' + id, user);
            },
            delete: function(id) {
                return $http.delete('/invite/' + id);
            }
        };
    });
