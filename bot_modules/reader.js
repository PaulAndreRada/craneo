var responder = require('./responder');
var noCommandSet = require('./responses/no-command-set');

//helpers
var contextParser = require('./helpers/context-parser');
var ERROR_LOGS = require('./helpers/error-logs');

module.exports = function(context){

    // Make sure the context argument is safe
    try{ contextParser(context) }
    catch(error){ console.log('Reader Error: ', error); }
    // Make sure the responseList is safe
    try{ context.bot.responseList }
    catch(error){ console.log('Reader Error: ', error); }

    var findResponse = function(){
      var list = context.bot.responseList,
          length = list.length,
          message = context.bot.message,
          ability, commands, notFound;
      // Go trough the available ability objects
      // inside the responseList
      for( var i=0; i<length; i++ ){
        ability = list[i];
        commands = ability.commands;
        // save the users commandNotFound response
        notFound = ability.name === "commandNotFound"?
          ability.response : noCommandSet;
        // if the command is undefined re-assign it to an empty array
        // to avoid and error
        if (!commands){
          commands = []
          console.log('Reader Error: ' + ERROR_LOGS.COMMAND_PROP_MISSING );
        }
        // go trough that ability objects' possible commands
        for( var index=0; index<commands.length; index++ ){
          // if the command matches,
          if ( message.match( commands[index] ) ){
              // return it's response function
              return ability.response;
          }
        }
      }
      return notFound;
    };


    // Read
    var response = findResponse();
    if( response ){
      // pass to the responder expecting
      // a new responseList in return
      return responder(response, context);
    } else {
      // if the response is undefined
      console.log("Reader Error: "+ ERROR_LOGS.RESPONSE_MAYBE_UNDEFINED );
      console.log("Reader Error: " + ERROR_LOGS.RESPONSE_LIST_RESET );
      return 'endAbility';
    }
}
