

module.exports = function(context){
  var error = "context is safe";
  // Check for context
  if( typeof context !== 'object' ){
    error = "The context argument needs to be an object";
    throw error;
  }
  // Check for a message object
  if( !context.message ){
    error = "Missing message: A messege to read needs to be available";
    throw error;
  // Check if the message is a string
  } else if( typeof context.message !== 'string' ){
    error = "The message prop on context needs to be a string";
    throw error;
  }
  // Check for a responseList
  if( !context.responseList ){
    error = "Missing responseList: A list of possible responses needs to be available";
    throw error;
  } else if( context.responseList && context.responseList.constructor !== Array){
    error = "The responseList prop needs to be an array of objects";
    throw error;
  }
  // Check for a missing sender name
  if( !context.from ){
    error =  "The from prop is not available";
    throw error;
  // Check for the senders name is not a string
  } else if( typeof context.from !== 'object' ){
    error =  "The from prop needs to be an object with all the user info a response could need";
    throw error;
  }
  return error;
}// exports
