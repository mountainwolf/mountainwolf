angular.module['infoodity.searchResults', []]

  .controller('ResultsController', function ($scope, Results){

    $scope.data = {} // getData

    $scope.getResults = function (data) { // function used to populate data field
      Results.getResults() // call $http function
        .then(function (data) {
          $scope.data.results = data; // on return of $http call, populate data
        })
        .catch(function (error) {
          console.error(error); // if error on return of $http call, return error
        });
    };

    $scope.getResults();

    $scope.changeView = function(view); // call getResults after controller is created
  });

