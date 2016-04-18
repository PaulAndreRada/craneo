var responder = require('./responder');
var contextParser = require('./helpers/contextParser');

module.exports = function(context){

    // Make sure the context argument is safe
    try{ contextParser(context) }
    catch(error){ console.log('Reader Error: ', error); }

    var findResponse = function(){
      var list = context.responseList,
          length = list.length,
          message = context.message,
          ability, commands;
      // Go trough the available ability objects
      // inside the responseList
      for( var i=0; i<length; i++ ){
        ability = list[i],
        commands = ability.commands;
        // go trough that ability objects' possible commands
        for( var index=0; index<commands.length; index++ ){
          // if the command matches,
          // return it's response function
          if ( message.match( commands[index] ) ){
              // response is a function
              // that returns a new responseList
              return ability.response;
          }
        }
      }
      return handleNotFound();
    };

    var handleNotFound = function(){
      console.log('command not found');
      return false;
      // in the near future it should return a response
      // with all the commands available
    };

    var response = findResponse();

    if( response ){
      // pass to the responder expecting
      // a new responseList in return
      return responder(response, context);
    } else {
      return false;
    }
}
