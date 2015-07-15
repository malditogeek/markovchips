
var fs = require('fs');
var Tweets = require('./tweets');

var username = process.argv[2];

Tweets.fetch(username, function(tweets) {
  var fname = username + '_tweets.json';
  var data  = JSON.stringify(tweets);

  fs.writeFile(fname, data, function(err) {
    process.exit(err ? 1 : 0);
  });
});
