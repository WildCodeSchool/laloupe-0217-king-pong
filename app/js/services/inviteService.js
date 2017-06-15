angular.module('app')
    .service('InviteService', function($http) {
        return {
            create: function(infoCommunity) {
                return $http.post('/invitations/', infoCommunity);
            },
            getAll: function() {
                return $http.get('/invitations/');
            },
            getOne: function(id) {
                return $http.get('/invitations/' + id);
            },
            getByUser: function(params) {
              console.log(params);
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
