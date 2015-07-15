var Twitter = require('twitter');

var client = new Twitter({
  consumer_key:         process.env.TWKEY,
  consumer_secret:      process.env.TWSECRET,
  access_token_key:     process.env.TWTOKEN,
  access_token_secret:  process.env.TWTOKENSECRET
});

var fetch = function fetch(username, cb, max_id, accum) {
  accum = accum || [];

  var params = {
    screen_name:  username,
    count:        200,
    max_id:       max_id
  };

  client.get('statuses/user_timeline', params, function(err, tweets){
    if (err) return cb(err);

    accum = accum.concat(tweets);

    if (tweets.length === 1) return cb(accum);

    max_id = tweets[tweets.length-1].id;
    fetch(username, cb, max_id, accum);
  });
};

module.exports = {
  fetch: fetch
};
