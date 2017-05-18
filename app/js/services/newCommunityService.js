angular.module('app')
    .service('NewCommunityService', function($http) {
        return {
            create: function(infoCommunity) {
                return $http.post('/newCommunities/', infoCommunity);
            },
            getAll: function() {
                return $http.get('/newCommunities/');
            },
            getOne: function(id) {
                return $http.get('/newCommunities/' + id);
            },
            update: function(id, user) {
                return $http.put('/newCommunities/' + id, user);
            },
            addUser: function(id, user) {
                return $http.put('/newCommunities/user/' + id, user);
            },
            delete: function(id) {
                return $http.delete('/newCommunities/' + id);
            }
        };
    });
