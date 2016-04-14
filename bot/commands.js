var abilities = require('./abilities');

// Links the commands to the ability
// multiple commands can have the same ability
module.exports = [
  {
    "commands": [
      /^(.*?(\bhey\b)[^$]*)$/i,
      /^(.*?(\byo\b)[^$]*)$/i,
      /^(.*?(\bsup\b)[^$]*)$/i
    ],
    "ability" : abilities.greet,
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
