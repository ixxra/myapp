var router = require('express').Router();
var vlc = require('../../lib/vlc');
var q = require('querystring');
var path = require('path');

//TODO: Clean repeated code...

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


router.get('/', function (req, res, next) {
  res.send('VLC Remote Control\n');
});

router.post('/:cmd', function(req, res, next) {
  var msg = 'OK';

  switch (req.params.cmd) {
    case 'play':
      vlc.play();
      break;
    case 'pause':
      vlc.pause();
      break;
    case 'stop':
      vlc.stop();
      break;
    case 'next':
      vlc.next();
      break;
    case 'prev':
      vlc.prev();
      break;
    default:
      msg = 'ERROR';
  }

  res.send(msg + '\n');
});

router.get('/playlist', function(req, res, next) {
  vlc.playlist(function cb(err, playlist){
    if (err) throw err;

    res.send(playlist.map(cleanItem));
  });
});

module.exports = router;
