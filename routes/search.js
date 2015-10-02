var router = require('express').Router();
var mongoose = require('mongoose');
var Metadata = require('../models/metadata');

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
        res.render('search', {
          results: docs,
          title: 'Library search',
          total: docs.length
        });
        mongoose.disconnect();
    });
  });
};

router.get('/', function(req, res, next) {
  if (req.query.hasOwnProperty('q')){
    search(res, req.query.q);
  } else {
    res.render('index', {title: 'Library search'});
  }
});

module.exports = router;
