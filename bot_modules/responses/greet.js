var askName = require('./ask-name');

// Greets the user
module.exports = function(context){
    console.log("Hey there, this is a default testing response, please set your own responseList when initializing the bot");
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
    ]
};
