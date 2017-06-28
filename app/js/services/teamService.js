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
            leaveChallenge: function(params) {
                return $http.put('/teams/leave', params);
            },
            changeTeam: function(id, info) {
                return $http.put('/teams/change/' +id , info);
            },
            updateScore: function(id, score) {
                return $http.put('/teams/score/' + id, score);
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
