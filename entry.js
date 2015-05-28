var fs = require('fs');
var readline = require('readline');
var buffer = {};
 
var QUIT_KEYWORD = 'end';
var FNAME = 'output.json';
 
var rl = readline.createInterface({
  completer: function(line) {
    var completions = Object.keys(buffer);
    var suggestions = completions.filter(function(item) {
      return item.indexOf(line.toLowerCase()) === 0;
    });
 
    return [suggestions, line];
  },
  input: process.stdin,
  output: process.stdout
});
 
var ask = function() {
  rl.question('> ', function(entered) {
    if ((entered = entered.replace(/^\s+/, ''),
         entered = entered.replace(/\s+$/, ''),
         entered === QUIT_KEYWORD)) {
      quit();
      return;
    }
 
    if (!buffer[entered.toLowerCase()]) {
      buffer[entered.toLowerCase()] = 0;
    }
 
    buffer[entered.toLowerCase()]++;
    ask();
  });
};
 
var quit = function() {
  rl.close();
  fs.writeFile(FNAME, JSON.stringify(buffer));
  console.log('Statistics saved in file ' + FNAME);
};
 
console.log('Enter word and press Enter to save into buffer. To end, type \'' + 
            QUIT_KEYWORD + '\':');
ask();
