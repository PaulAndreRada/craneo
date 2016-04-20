Next:
  //-clean out the promises
  //-test graph till it's stable
    //-command does not exist
    //-response list does not exist
    //-context not available
      //-message
      //-response list
      //-sender
      //-length of response list
  //-make the responder object as a promise
  //-add a command not found function

  //-change the name of the abilities to a responseList
  //-add a response for a command not found
  //-create a mergeObject helper for the state
  //-add the mergeObject function to the setState function

  -create and Aux object to pass stuff (like sockets to the response)
  -create an option to change context mid conversation
  -response list should bubble up a response object and responseList ???? <--- try doing a whole note function before this
  -add a error handler for the wrong responseList format (and array with no object or an array with the wrong object)- basically make a responseListErrorParser

  -add general error handlers
  - change file names for the normal-convention
  -add promises where async is needed
  -make a notes ability



Commit
created an insane amount of error returns for easier debugging of the reader function
created the responder module as a promise





Recap:
Object Oriented Programming:  <--- template with unique instance
object made by functions return
Functional Oriented programming: <--- template with individual process ( no unique instance for later use )
Template created and called every time the function runs

CONCLUSION:
FOP takes less memory & fits this situation. No need to save the memory on a reader - for now.
Reader evolution = fixed set of functions that will either changec completly or not be edited.


Just did:
  Created the basic structure for the bot framework to scale in mode negative abilities
    searches the msg for a command and triggers the appropriate ability for that command.
      It does this by reading the commands array of objects


      1-Make the bot.js script easier to read
        -change self to this
        -Change the name of the commands module to be the abiltity_index... ability nest
      -build the context package

Todo:

  2-Create support for mode heavy functions
    -ex: sender: make note
         bot: what would you like your note to say?
         { bot expects only note info }  
         sender: [note info]
         { bot shows note with "tap to edit mark"}
         bot: Saved
         bot: Done with notes?
         { show options: "done" || "new note" }
  3-Create the sign up/log in features
  4-Create a feature to make the bot useful in the most basic way possible
  5-Create the designs for that bot
  6-Code the backend:
      Bot to Firebase
  7-Code the front-end:
      React + Redux + React native




bin


/*

try{
  context.state.message === "";
} catch(error){ return console.log('message needs to be a string'); }

  function(context){
  try{
    var message = context.state.message,
          from = context.props.sender,
          list = context.state.responseList,
          response = false,
          length = list.length;
  } catch(error){
    console.log('error: ',error);
    console.log("the reader's context failed to provide the propper variables");
  };




  // MATCH COMMAND
  // go trough the available abilities
  for( var i=0; i<length; i++){
    var ability = list[i],
      commands = ability.commands;
    // go trough that abilitie's commands
    for( var index=0; index<commands.length; index++ ){
      // if the command matches, set it's response
      // and pass it the state and save it's returning context
      console.log( 'checking maches' );
      if ( message.match( commands[index] ) ){
          console.log( 'matched' );
          return response = ability.response(context);
      };
    }
  }
}


var triggerResponse = function(){
  // trigger the returned response function
  // from the matching response object
    return response(context);
};



var triggerResponse = function(response){
  // trigger the returned response function
  // from the matching response object
    return response(context);
};

// initialize the reader
var response = findResponse();
var newResponseList = triggerResponse(response);

return newResponseList;
// return the promise with the following responseList
//  resolve(newResponseList);
// reject and report any errors as a Reader Error
//  reject(Error("Reader Error"));


};
