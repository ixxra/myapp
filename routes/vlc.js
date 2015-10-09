var express = require('express');
var router = express.Router();
var vlc = require('../lib/vlc');
var q = require('querystring');
var path = require('path');


function basenameFromUrl(url) {
    return q.unescape(path.basename(url));
}

function cleanItem(item){
  var url = item['xesam:url'];
  var newItem = {
    time: item['vlc:time'],
    url: url,
  };

  if (item.hasOwnProperty('xesam:tracknumber')){
    newItem.tracknr = item['xesam:tracknumber'];
  }

  if (item.hasOwnProperty('xesam:title')){
    newItem.title = item['xesam:title'];
  } else {
    newItem.title = basenameFromUrl(url);
  }

  if (item.hasOwnProperty('xesam:album')){
    newItem.album = item['xesam:album'];
  }

  if (item.hasOwnProperty('xesam:artist')){
    newItem.artist = item['xesam:artist'].join();
  }

  if (item.hasOwnProperty('xesam:genre')){
    newItem.genre = item['xesam:genre'].join();
  }

  return newItem;
};

router.get('/', function route(req, res, next) {
  vlc.playlist(function cb(err, playlist){
      if (err) throw err;

      playlist = playlist.map(cleanItem);
      res.render('vlc', {
        title: 'Vlc Remote Control',
        playlist: playlist
      });
  });

});

module.exports = router;
