//all available abilities
var greet = require('./ability_modules/greet');

// Links the commands to the ability
// multiple commands can have the same ability
module.exports = [
  {
    "commands": [
      /^(.*?(\bhey\b)[^$]*)$/i,
      /^(.*?(\byo\b)[^$]*)$/i,
      /^(.*?(\bsup\b)[^$]*)$/i
    ],
    "ability" : greet,
    "hasMode": false,
  },
  {
    "commands": [
      /^(.*?(\btest\b)[^$]*)$/i,
    ],
    "ability" : function(){ console.log('tested'); },
    "hasMode": false,
  },
];
