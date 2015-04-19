var data = require('../data/testData');
var db = require('../db/index');
var adapter = require('../data/adapter')
var image_uploader = require('../cloudinary/upload');
var fs = require('fs');
var multiparty = require('multiparty');

var useDB = true;

module.exports = {
  getRestaurantsWithName: function(req, res, next) {

    if (useDB) {
      db.search(req.query.query, function(rows){
        var result = adapter.restaurantsFromSearch(rows)
        res.end(JSON.stringify(result));
      });
    } else {
      var restaurants = data.data.restaurants;
      var list = [];
      restaurants.forEach(function(restaurant){
        if (restaurant.name === req.query.query) {
          list.push(restaurant);
        }
      })

      res.end(JSON.stringify(list));
    }


  },

  getRestaurantWithID: function(req, res, next) {
    if (useDB){
      db.restaurantInfo(Number(req.params.id), function(rows){
        var result = adapter.restaurantsFromSearch(rows[0])

        res.end(JSON.stringify(result));
      });

    } else {
      var restaurants = data.data.restaurants;
      var list = [];
      restaurants.forEach(function(restaurant) {

        if (restaurant.id === Number(req.params.id)) {
          list.push(restaurant);
        }
      })
      var result = adapter.restaurantsFromQuery(list[0]);
      res.end(JSON.stringify(result));
    }
  },

  getReviewsWithRestaurantID: function(req, res, next) {
    if (useDB) {
      db.restaurantReviews(Number(req.params.id), function(rows){
        var result = adapter.restaurantsFromSearch(rows)
        res.end(JSON.stringify(rows));
      });
    } else {
        var reviews = data.data.reviews;

        var list = [];
        var id = Number(req.params.id);
        reviews.forEach(function(review) {
          if (review.restaurantID === id) {
            list.push(review);
          }
        })
        var result = adapter.reviewsFromQuery(list);
        res.end(JSON.stringify(result));
    }
  },

  postReview: function(req, res, next) {
    if (useDB) {
      var info = req.body;
      db.postReview(info.user_id,info.restaurant_id,info.rating,info.dish_name, info.text, info.image_url, function(rows) {
        res.status(202).end();
      } );
    } else {
      res.status(202).send('post request was heard');
    }
  },

  postFullReview: function(req, res, next) {
    var form = new multiparty.Form();

    var stream = image_uploader.upload_stream(function(result) {
          console.log(result);
          req.body.image_url = result.url;
          module.exports.postReview(req, res, next) 
        });

    form.parse(req, function(err, fields, files){
      for (var key in fields) {
        req.body[key] = fields[key][0];
      }
      fs.createReadStream(files.file[0].path)
        .pipe(stream)

    })

  }

}

// <script src="lib/jquery/dist/jquery.min.js"></script>

// <form method="post" id="myform" action="#" enctype="multipart/form-data">
// <p>Image: <input type="file" id="files" name="image"/></p> 
// <p>review text: <input type="text" id='reviewtext' name="review"/></p> 
// <p>rating: <input type="number" id='rating' name='rating'/></p>
// <p>dish name: <input type="text" id='dish_name' name='rating'/></p>
// <p><input type="submit" value="Upload"/></p>
// </form>

// <script>
// $("#myform").on('submit', function(event){
//   var fd = new FormData();
//   fd.append('file', $('#files')[0].files[0], "Image");
//   fd.append('text', $('#reviewtext')[0].value);
//   fd.append('rating', $('#rating')[0].value);
//   fd.append('dish_name', $('#dish_name')[0].value);
//   fd.append('user_id', 1);
//   fd.append('restaurant_id', 1);

//   event.stopPropagation();
//   event.preventDefault();

//   $.ajax({
//     url: '/api/review',
//     type: 'POST',
//     data: fd,
//     processData: false,
//     contentType: false,
//     success:function(){

//     },

//   });
// })
// </script>