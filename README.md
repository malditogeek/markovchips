# MarkovChips

Generate random tweets using Markov chains

## How To Use It

Create a Twitter app, generate a token for yourself and populate the following env vars:
```
export TWKEY TWSECRET TWTOKEN TWTOKENSECRET
```

Then fetch all tweets for a user and generate random ones:
```
$> npm install
$> node fetch_tweets.js <username>
$> node generate.js <username>
```
