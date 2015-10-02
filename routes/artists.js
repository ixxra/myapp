var Metadata = require('../models/metadata');
var mongoose = require('mongoose');
var router = require('express').Router();


function connect() {
  mongoose.connect('mongodb://localhost/media', function(err){
    if (err) throw err;//TODO: Change to redirect 308 or so.
  });
}

/* GET. */
router.get('/', function(req, res, next){
  connect();
  Metadata.find().distinct('artist', function(err, docs){
    res.render('artists', {
      artists: docs.sort(),
      title: 'Artists',
      total: docs.length
    });
    mongoose.disconnect();
  });
});

router.get('/:artist', function(req, res, next) {
  connect();
  Metadata.find({artist: req.params.artist}, function(err, docs){
    console.log(docs);
    res.render('artists', {
      tracks: docs,
      title: req.params.artist,
      total: docs.length
    });
    mongoose.disconnect();
  });
});

module.exports = router;
