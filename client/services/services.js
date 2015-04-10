angular.module('infoodity.services', [])

.factory('Results', function ('$http'){

  var getResults = function(){
    return $http({
      method: 'GET',
      url: '/api/results'
    })
    .then(function(resp) {
      return resp.data;
    });
  }

  var getRestaurant = function(data){
    return

  }

  return {
    getResults: getResults;
    getRestaurant: getRestaurant;
  }
});

.factory('Restaurant', function ('$http'){

  var getRestaurant = function(restaurant){
    return $http({
      method: 'GET',
      url: '/api/results/' + restaurant
    })
    .then(function(resp) {
      return resp.data;
    });
  }

  return {
    getResults: getResults;
  }
});
