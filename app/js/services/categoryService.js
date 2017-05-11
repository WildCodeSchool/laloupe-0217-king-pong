angular.module('app')
    .service('CategoryService', function($http) {
      return {

           getOne: function(id) {
               return $http.get('/categorys/' + id);
           },
           update: function(id, category) {
               return $http.put('/categorys/' + id, category);
           },
           delete: function(id) {
               return $http.delete('/categorys/' + id);
           }
       };

    });
