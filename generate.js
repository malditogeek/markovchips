
var MarkovChain = require('./markov_chain');
var fs = require('fs');

var username = process.argv[2];
var words = process.argv[3] || 21;

var fname = username + '_tweets.json';

fs.readFile(fname, function(err, data) {
  if (err) process.exit(1);

  var tweets = JSON.parse(data);

  console.log('Using ' + tweets.length + ' tweets as seed');

  var markov = new MarkovChain();

  tweets.forEach(function(tweet) { 
    markov.ingest(tweet.text);
  });

  var tweet = markov.generate(words);
  console.log(tweet);
});
