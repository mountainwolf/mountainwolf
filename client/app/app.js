
var infoodity = angular.module('infoodity', ['ui.router'])
  

infoodity.config(function($stateProvider, $urlRouterProvider) {
    
  $urlRouterProvider.otherwise('home');

  $stateProvider
    .state('home', {
      url: '/home',
      views: {
        'viewA': { 
          template: '<h1> Welcome! Please Choose a Restaurant Above </h1>' 
        }
      }
    })
    .state('searchResults', {
      url: '/search-results',
      views: {
        'viewA': { 
          templateUrl: 'searchResults/results_lance.html',
  //      controller: 'results/results.js'
        }
      }
    })
    .state('restaurantPage', {
      url: '/restaurant-page',
      'views': {
        'viewA': {
          templateUrl: 'restaurantPage/restaurantPage.html',
    //    controller: 'restaurantPage/restaurantPage.js'
        }
      }
    })
    .state('reviews', {
      parent: 'restaurantPage',
      url: '/reviews',
      views: {
        'viewB': { 
          template: 'reviews/reviews.html',
  //      controller: 'reviews/reviews.js'
        }
      }
    })
//     .state('post', {
//      url: '/results',
//      parent: 'restaurantPage',
//      templateUrl: 'results/results.html',
//      controller: 'results/results.js'
//    })
});

