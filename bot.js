var Reader = require('./bot_modules/reader');
var ResponseList = require('./bot_modules/response-list');
// helpers
mergeObjects = require('./bot_modules/helpers/merge-objects');

module.exports = function(config){
  var bot = new Object();

  bot = {
    props: {
      botName : config.name || 'friday',
      listeningEvent : config.listeningEvent || 'chat message',
      sender : config.sendersName || 'prada',
    },
    state: {
      message: false,
      responseList: ResponseList,
      listening: false,
      responded: false,
      process: "init",
    },
    setState:function(nextState){
      // if "endAbility" has been returned
      // Reset the responseList
      var endAbility = nextState.responseList === 'endAbility'?
                       ResponseList : nextState.responseList;
      // Update the state
      bot.state = {
        message: nextState.message || bot.state.message,
        responseList : endAbility || bot.state.responseList,
        listening: nextState.listening || bot.state.listening,
        responded: nextState.responded || bot.state.responded,
        process: nextState.process || bot.state.process
      };
      //console.log( bot.state );
    },
    handleMessage: function(){
      var context = bot.buildContext(), bubbleUp;
      // read the message, pass the latest context
      // and save whatever bubbles up
      // The bubbleUp hould be the following response list
      bubbleUp = Reader( context );
      // Set the next responseList
      bot.setState({
        "responseList": bubbleUp,
        "process": "response returned"
      });
    },
    buildContext: function(){
      return {
        "message" : bot.state.message,
        "responseList" : bot.state.responseList,
        "from" : {"user" : 'something'}
      }
    },
    listen: function(msg){
      bot.setState({
          message: msg,
          process : 'listening'
        });
      bot.handleMessage();
    },
    direct:function(){},
  } // bot

  return bot;
}// export
