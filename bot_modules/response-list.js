// All available abilities
// Default functions
var greet = require('./responses/greet');
var askName = require('./responses/ask-name');

// A list of responses
module.exports = [
  {
    "name": "greet",
    "response": greet,
    "commands": [
      /^(.*?(\bhey\b)[^$]*)$/i,
      /^(.*?(\byo\b)[^$]*)$/i,
      /^(.*?(\bsup\b)[^$]*)$/i,
      /^(.*?(\what\b)[^$]*)$/i,
      /^(.*?(\bup\b)[^$]*)$/i
    ],
    "highlightCommands": [
      "What's up?",
      "Hey you"
    ]
  },
  {
    "name": "askName",
    "response": askName,
    "commands": [
      /^(.*?(\byour name\b)[^$]*)$/i,
    ],
    "highlightCommands": [
      "What's your name?",
      "You are?"
    ]
  }
];
