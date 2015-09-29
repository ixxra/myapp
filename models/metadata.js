var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Metadata = new Schema({
  location: {type: String, index: true},
  title: {type: String},
  artist: {type: String},
  album: {type: String},
  track: {type: Number},
  year: {type: Number}
}, {collection: 'metadata'});

module.exports = mongoose.model('Metadata', Metadata);
