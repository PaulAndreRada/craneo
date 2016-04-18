
module.exports = function(response, context){
    var newResponseList;

    // Try the respose function and report any errors and bubble them
    // up to the reader and bot in a promise
    try { newResponseList = response( context ); }
    catch(error){ console.log("Response Error: "+ error); }

    // return the promise with the following responseList
    return newResponseList;
};
