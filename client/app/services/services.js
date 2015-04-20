infoodity.factory('Search', function($http) {
  var _results = {};

  var search = function(query) {
    return $http({
      method: 'GET',
      url: '/api/search',
      params: {query: query}
    })
    .then(function(resp) {
      _results = resp.data;
    });
  };

  var results = function() {
    return _results;
  };

  return {
    search: search,
    results: results
  };
});

infoodity.factory('Restaurant', function($http) {
  var _restaurant = {};

  var setRestaurant = function(id) {
    return $http({
      method: 'GET',
      url: '/api/restaurant/' + id
    })
    .then(function(resp) {
      _restaurant = resp.data;
    });
  };

  var getRestaurant = function() {
    return _restaurant;
  };

  return {
    getRestaurant: getRestaurant,
    setRestaurant: setRestaurant
  };
});

infoodity.factory('Reviews', function($http) {
  var getReviews = function(id) {
    return $http({
      method: 'GET',
      url: '/api/reviews/' + id
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  var postReview = function(formData) {
    return $http({
      method: 'POST',
      url: 'api/review',
      processData: false,
      data: formData,
      transformRequest:angular.identity,
      headers:{'Content-Type':undefined}
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  return {
    getReviews: getReviews,
    postReview: postReview
  };
});

infoodity.directive('validFile', function () { // allows for validation that a file (img) has been uploaded in submitReview.html
  return {
    require: 'ngModel',
    link: function (scope, el, attrs, ngModel) {
      ngModel.$render = function () {
        ngModel.$setViewValue(el.val());
      };
    el.bind('change', function () {
      scope.$apply(function () {
        ngModel.$render();
        });
      });
    }
  };
});
