angular.module('infoodity.restaurantPage', [])

  .controller('RestaurantController', ['$scope', 'Restaurant', '$location', function ($scope, Restaurant, $location){
    console.log('hi');
    var idSelected = $location.path().split('/').pop();

    $scope.getRestaurant = function(id){
      Restaurant.getRestaurant(id)
        .then(function (data) {
          $scope.results = data; // on return of $http call, populate data
        })
          .catch(function (error) {
            console.error(error); // if error on return of $http call, return error
          });
    };

    $scope.getRestaurant(1);
    // <div class="row test" ui-view="secondary-content">
    // </div> // ui route to reviews
    $scope.getRestaurant(idSelected);
}]);
