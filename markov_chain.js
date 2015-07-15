
function MarkovChain() {
  this.cache = {'_START': []};
} 

MarkovChain.prototype.isWord = function(str) {
  return str.match(/\w+/);
};

MarkovChain.prototype.isNotUrl = function(str) {
  return !str.match(/^http/);
};

MarkovChain.prototype.isNotMention = function(str) {
  return !str.match(/^@/);
};

 
MarkovChain.prototype.ingest = function(input) {
  var cache = this.cache;

  // Get the source text and split it into words
  var text = input.split(/\s+/g)
             .filter(this.isWord)
             .filter(this.isNotUrl)
             .filter(this.isNotMention);

  if (!text.length) return;
 
  // Add it to the start node's list of possibility
  cache['_START'].push(text[0]);
  
  // Now go through each word and add it to the previous word's node
  for (var i = 0; i < text.length - 1; i++) {
    if (!cache[text[i]]) cache[text[i]] = [];

    cache[text[i]].push(text[i + 1]);
    
    // If it's the beginning of a sentence, add the next word to the start node too
    if (text[i].match(/\.$/)) cache['_START'].push(text[i + 1]);
  }
};
 
MarkovChain.prototype.generate = function(words) {
  var cache = this.cache;
  var currentWord = '_START';
  var str = '';
  
  for (var i = 0; i < words; i++) {
    
    // Follow a random node, append it to the string, and move to that node
    var rand = Math.floor(Math.random() * cache[currentWord].length);
    str += cache[currentWord][rand];
    
    // No more nodes to follow? Start again. 
    // (Add a period to make things look better.)
    if (!cache[cache[currentWord][rand]]) {
      currentWord = '_START';
      if (!cache[currentWord][rand].match(/\.$/))
          str += '. ';
      else
          str += ' ';
    } else {
      currentWord = cache[currentWord][rand];
      str += ' ';
    }
  }

  return str;
};

module.exports = MarkovChain;
