angular.module('app')
    .controller('ChallengeController', function($scope, ChallengeService, $state) {
      // var id = $state.params;

$scope.challenges = [];

        ChallengeService.getAll().then(function(res){
          console.log(res.data);
          $scope.challenges = res.data[0];
        });


    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered

    $('.modal').modal({

     ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
       alert("Ready");
       console.log(modal, trigger);
     },
     complete: function() { alert('Closed'); } // Callback for Modal close
   }
 );

  });
