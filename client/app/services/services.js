angular.module('infoodity.services', [])

  .factory('Results', function ($http) {

    var getResults = function(name){
      console.log('getResults')
      return $http({
        method: 'GET',
        url: '/api/search',
        params: {name: name}
      })
      .then(function(resp) {
        console.log(resp);
        return resp.data;
      });
    }

    return {
      getResults: getResults
    }
  })

  .factory('Restaurant', function ($http){

    var getRestaurant = function(id){
      return $http({
        method: 'GET',
        url: '/api/restaurant/' + id
      })
      .then(function(resp) {
        return resp.data;
      });
    }

    return {
      getRestaurant: getRestaurant
    }
  })

  .factory('Reviews', function ($http){

    var getReviews = function(id){
      return $http({
        method: 'GET',
        url: '/api/reviews/' + id
      })
      .then(function(resp) {
        return resp.data;
      });
    }

    return {
      getReviews: getReviews
    }
  })



