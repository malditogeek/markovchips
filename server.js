
var express = require('express');
var fs = require('fs');
var Tweets = require('./tweets');
var MarkovChain = require('./markov_chain');

var app = express();

var getUserTweets = function(username, cb) {
  var fname = username + '_tweets.json';

  fs.exists(fname, function(exists) {
    if (exists) {
      fs.readFile(fname, function(err, data) {
        if (err) return cb(err);
        var tweets = JSON.parse(data);
        cb(null, tweets);
      });
    } else {
      Tweets.fetch(username, function(tweets) {
        var data  = JSON.stringify(tweets);
        fs.writeFile(fname, data, function(err) {
          if (err) return cb(err);
          cb(null, tweets);
        });
      });
    }
  });
};

app.get('/markov', function(req, res) {
  var username = req.query.username || req.query.text;
  var words = req.query.words || 21;
  
  getUserTweets(username, function(err, tweets) {
    if (err) return res.send('Oops, try again');
  
    tweets.forEach(function(tweet) { 
      MarkovChain.ingest(tweet.text);
    });
  
    var tweet = MarkovChain.generate(words);
    res.send(tweet);
  });
});

app.listen(process.env.PORT || 4321);
