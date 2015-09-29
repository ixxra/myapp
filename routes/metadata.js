var express = require('express');
var Metadata = require('../models/metadata');
var mongoose = require('mongoose');
var router = express.Router();

var findAll = function findAll(res, query){
  mongoose.connect('mongodb://localhost/media', function(err){
    if (err) throw err;//TODO: Change to redirect 308 or so.

    Metadata.find(query, function(err, docs){
      res.send(docs);
      mongoose.disconnect();
    });
  });
};

var find = function find(res, id){
  mongoose.connect('mongodb://localhost/media', function(err){
    if (err) throw err;//TODO: Change to redirect 308 or so.

    Metadata.findById(id, function(err, docs){
      res.send(docs);
      mongoose.disconnect();
    });
  });
}

var search = function search (res, query){
  mongoose.connect('mongodb://localhost/media', function(err){
    var tokens = query.trim().split(' ')
      .filter(function(t) {
        return t.length > 0;
      })
      .map(function(t) {
        return '\\b' + t + '\\b'
      });

    var regexps = tokens.map(function(t){
      return new RegExp(t, 'i');
    });

    var conds = regexps.map(function(exp) {
      return {$or: [
        {title: exp},
        {artist: exp},
        {album: exp}
      ]};
    });

    Metadata.find({$and: conds}, function(err, docs){
        if (err) throw err;
        res.send(docs);
        mongoose.disconnect();
    });
  });
};

/* GET. */
router.get('/', function(req, res, next){
  if (req.query.hasOwnProperty('q')){
    search(res, req.query.q);
  } else {
    findAll(res, req.query);
  }
});

router.get('/:id', function(req, res, next) {
  find(res, req.params.id);
});

module.exports = router;
