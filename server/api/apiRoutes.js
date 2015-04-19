var apiController = require('./apiController');

module.exports = function (app) {

  app.route('/search')
     .get(apiController.getRestaurantsWithName);

  app.route('/restaurant/:id')
     .get(apiController.getRestaurantWithID);

  app.route('/reviews/:id')
     .get(apiController.getReviewsWithRestaurantID);

  app.route('/review')
     .post(apiController.postFullReview);
}
