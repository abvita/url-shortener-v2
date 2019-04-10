var express = require('express');
var app = express();
var path = require('path');
var base58 = require('./base58.js');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var Url = require('./models/url');

//Db config for prod and local environments
if (process.env.NODE_ENV === 'production'){
  mongoose.connect(process.env.MONGODB_URI + '?authSource=admin');
  console.log(process.env.MONGODB_URI + '?authSource=admin');
}
else{
  config.webhost = '';
  config.db.host = 'localhost';
  mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);
}

//handles JSON
app.use(bodyParser.json());
//handles URL encoding
app.use(bodyParser.urlencoded({ extended: true }));
//directs express to serve static files from public folder
app.use(express.static(path.join(__dirname, 'dist/url-shortener')));

//EXPRESS ROUTES
//route to serve up the homepage (index.html)
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'dist/url-shortener/index.html'));
});

//route to create and return a shortened URL given a long URL
app.post('/api/shorten', function(req, res){
  var longUrl = req.body.url;
  var shortUrl = '';

  //checks if given url already exists
  Url.findOne({long_url: longUrl}, function (err, doc){
    if (doc){
      shortUrl = config.webhost + base58.encode(doc._id);
      res.send({'shortUrl': shortUrl});
    } else {
      //if not, creates new db entry
      var newUrl = Url({
        long_url: longUrl
      });
      newUrl.save(function(err) {
        if (err){
          console.log(err);
        }
        shortUrl = config.webhost + base58.encode(newUrl._id);
        res.send({'shortUrl': shortUrl});
      });
    }
  });
});

//route to redirect the visitor to their original URL given the short URL
app.get('/:encoded_id', function(req, res){
  var base58Id = req.params.encoded_id;
  var id = base58.decode(base58Id);

  //checks if given url already exists
  Url.findOne({_id: id}, function (err, doc){
    if (doc) {
      console.log('found in db:', doc);
      res.redirect(doc.long_url);
    } else {
      //If nothing found, directs back to index
      res.redirect(config.webhost);
    }
  });
});

//starts Node server
var server = app.listen(process.env.PORT || 5000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  })
