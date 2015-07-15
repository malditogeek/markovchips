 
// Holds the state information
var cache = {
    '_START': []
};

var isWord = function(str) {
  return str.match(/\w+/);
};

var isNotUrl = function(str) {
  return !str.match(/^http/);
};

var isNotMention = function(str) {
  return !str.match(/^@/);
};

 
var ingest = function(input) {
  // Get the source text and split it into words
  var text = input.split(/\s+/g).filter(isWord).filter(isNotUrl).filter(isNotMention);

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
 
var generate = function(words) {
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

module.exports = {
  ingest: ingest,
  generate: generate
};
