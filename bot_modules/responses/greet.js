var askName = require('./ask-name');

// Greets the user
module.exports = function(context){
    console.log("SUP YOOOOO");
    return [
      {
        "name": "askName",
        "commands": [
          /^(.*?(\bhey\b)[^$]*)$/i,
          /^(.*?(\byo\b)[^$]*)$/i,
          /^(.*?(\bsup\b)[^$]*)$/i
        ],
        "response": askName
      }
    ];
};
