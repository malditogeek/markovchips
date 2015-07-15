
var MarkovChain = require('./markov_chain');
var fs = require('fs');

var username = process.argv[2];
var words = process.argv[3] || 21;

var fname = username + '_tweets.json';

fs.readFile(fname, function(err, data) {
  if (err) process.exit(1);

  var tweets = JSON.parse(data);
  tweets.forEach(function(tweet) { 
    MarkovChain.ingest(tweet.text);
  });

  var tweet = MarkovChain.generate(words);
  console.log('MarkovChips says:', tweet);
});
