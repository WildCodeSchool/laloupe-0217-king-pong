angular.module('app')
    .service('TeamService', function($http) {
        return {
            create: function(player){
              return $http.post('/teams', player);
            },
            addPlayer: function(teamId,infos){
              return $http.put('/teams/invitation/'+ teamId, infos);
            },
            update: function(id, user) {
                return $http.put('/teams/' + id, user);
            },
            getAll: function() {
                return $http.get('/teams');
            },
            getOne: function(id) {
                return $http.get('/teams/' + id);
            },
            delete: function(id) {
                return $http.delete('/teams' + id);
            },

        };
    });
