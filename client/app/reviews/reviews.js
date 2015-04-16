angular.module('infoodity.reviews', [])

  .controller('ReviewsController', ['$scope', 'Reviews', function ($scope, Reviews){
   var idSelected = $location.path().split('/').pop();

    $scope.getReviews = function(id){
      Reviews.getReviews(id)
        .then(function (data) {
          $scope.results = data; // on return of $http call, populate data
        })
          .catch(function (error) {
            console.error(error); // if error on return of $http call, return error
          });
    };

    $scope.getReviews(idSelected);

  }]);
