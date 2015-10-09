#!/usr/bin/env iojs
var ps = require('child_process');

module.exports = {
  playlist: function playlist(callback){
    ps.exec('vlc-remote ls', function cb(err, data){
      var items;

      if (!err){
        items = JSON.parse(data);
      } else {
        items = data;
      }

      callback(err, items);

    });
  },

  play: function play() {
    ps.exec('vlc-remote play');
  },

  pause: function() {
    ps.exec('vlc-remote pause');
  },

  stop: function stop(){
    ps.exec('vlc-remote stop');
  },

  next: function() {
    ps.exec('vlc-remote next');
  },

  prev: function() {
    ps.exec('vlc-remote prev');
  }
};
