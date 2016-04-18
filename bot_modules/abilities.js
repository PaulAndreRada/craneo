//all available abilities
var greet = require('./responses/greet');
var getName = ""//require('./responses/getName');
var saveName = ""//require('./responses/saveName');

// A list of responses
module.exports = [
  {
    "name": "greet",
    "commands": [
      /^(.*?(\bhey\b)[^$]*)$/i,
      /^(.*?(\byo\b)[^$]*)$/i,
      /^(.*?(\bsup\b)[^$]*)$/i
    ],
    "response": greet
  }
];
