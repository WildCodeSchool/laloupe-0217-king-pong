angular.module('app')
    .service('CommunityService', function($http) {
        return {
            create: function(infoCommunity) {
                return $http.post('/communitys/', infoCommunity);
            },
            getAll: function() {
                return $http.get('/communitys/');
            },
            getOne: function(id) {
                return $http.get('/communitys/' + id);
            },
            update: function(id, user) {
                return $http.put('/communitys/' + id, user);
            },
            addUser: function(id, user) {
                return $http.put('/communitys/user/' + id, user);
            },
            delete: function(id) {
                return $http.delete('/communitys/' + id);
            }
        };
    });
