
module.exports = function(responseList){
  error="responseList is safe"
  if( !responseList.isArray && responseList === "endAbility" ){
    error = "responseList is not an array nor an endAbility command, make sure that your response always returns array of repsponse objects (as seen inside the response-List.js file or a string that says 'endAbility' to reset to the original list of responses)";
    throw error;
  } else if( !responseList[0] ){
    error = "The responseList returned from your response function must have at least one response object. For references of a response object look inside the responseList.js file"
    throw error
  }
  // other checks done inside the reader to avoid loss or performance:
  // if the command propery exist
  // if the response property exist
};
