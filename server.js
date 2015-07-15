
var express = require('express');
var fs = require('fs');
var Tweets = require('./tweets');
var MarkovChain = require('./markov_chain');

var app = express();

app.post('/fetch/:username', function(req,res) {
  var username = req.params.username;
  
  Tweets.fetch(username, function(tweets) {
    var fname = username + '_tweets.json';
    var data  = JSON.stringify(tweets);
  
    fs.writeFile(fname, data, function(err) {
      if (err) return res.send('Oops, try again');
      res.send('Imported ' + tweets.length + ' for ' + username);
    });
  });
});

app.get('/markov', function(req, res) {
  var username = req.query.username || req.query.text;
  var words = req.query.words || 21;
  var fname = username + '_tweets.json';
  
  fs.readFile(fname, function(err, data) {
    if (err) return res.send('Oops, try again');
  
    var tweets = JSON.parse(data);
  
    tweets.forEach(function(tweet) { 
      MarkovChain.ingest(tweet.text);
    });
  
    var tweet = MarkovChain.generate(words);
    res.send(tweet);
  });
});

app.listen(process.env.PORT || 4321);
