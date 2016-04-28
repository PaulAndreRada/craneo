var responder = require('./responder');
var noCommandSet = require('./responses/no-command-set');

//helpers
var contextParser = require('./helpers/context-parser');
var ERROR_LOGS = require('./helpers/error-logs');

var reader = function(context){
    var listObj = {},
      context = context;

    var tryContext = function(context){
      // Make sure the context argument is safe
      try{ contextParser(context) }
      catch(error){ console.log('Reader Error: ', error); }
      // Make sure the responseList is safe
      try{ context.bot.responseList }
      catch(error){ console.log('Reader Error: ', error); }
    };

    var findResponse = function(){
      var list = context.bot.responseList,
          length = list.length,
          message = context.bot.message,
          responseObj, commands, notFound;
      // Go trough the available reseponse objects
      // inside the responseList
      for( var i=0; i<length; i++ ){
        responseObj = list[i];
        commands = responseObj.commands;
        // save the users commandNotFound response
        notFound = responseObj.name === "commandNotFound"?
          responseObj.response : noCommandSet;
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
              // save this reseponse object
              listObj = responseObj;
              // return it's response function
              return responseObj.response;
          }
        }
      }
      return notFound;
    };

    // check for errors
    tryContext(context);
    // Read
    var response = findResponse();
    // if the response is a function
    if( response && typeof response === "function"){
      // pass to the responder expecting
      // a new responseList in return
      return responder(response, context);
    // Else check if the response is asking for a reader chain
  } else if( response === 'read' ) {
      // Check if the response has a new responseList
      if( listObj.responseList ){
        // replace the responseList that was just read
        // with a responseList for the next reading
        context.bot.responseList = listObj.responseList;
        // Check that responseList for errors
        tryContext(context);
        // Recur by calling the reader and returning it's bubble up
        return reader(context)
      }//if
    } else {
      // if the response is undefined
      console.log("Reader Error: "+ ERROR_LOGS.RESPONSE_MAYBE_UNDEFINED );
      console.log("Reader Error: " + ERROR_LOGS.RESPONSE_LIST_RESET );
      return 'endAbility';
    }
}

module.exports = reader;
