var Reader = require('./bot_modules/reader');
var ResponseList = require('./bot_modules/response-list');
// helpers
mergeObjects = require('./bot_modules/helpers/merge-objects');

module.exports = function(config){
  var bot = new Object();
  var defaultResponse = config.responseList;

  bot = {
    state: {
      message: '',
      responseNamesList: false,
      responseList: defaultResponse,
      listening: false,
      responded: false,
      process: "init",
    },
    setState:function(nextState){
      // if "endAbility" has been returned
      // Top level merge
      bot.state = mergeObjects(bot.state, nextState);
      // Reset the responseList
      bot.state.responseList = !bot.state.responseList?
        defaultResponse:  bot.state.responseList;
      // log the state to help debugging
      //console.log( bot.state );
    },
    handleMessage: function(){
      var context = bot.buildContext(), bubbleUp;
      // read the message, pass the latest context
      // and save whatever bubbles up
      // The bubbleUp hould be the following response list
      bubbleUp = Reader( context );
      // Set the next responseList or nameList
      bot.setState({
        "responseList": bubbleUp,
        "process": "response returned",
      });
    },
    buildContext: function(){
      var botContext = { bot: {
        'message': bot.state.message,
        "responseList" : bot.state.responseList,
      }}
      return mergeObjects( botContext,
        { client: bot.state.clientContext });
    },
    listen: function(msg, context){
      bot.setState({
          message: msg,
          process : 'listening',
          clientContext : context || false,
        });
      bot.handleMessage();
    }
  } // bot

  // merge the config into the state
  bot.setState(config);

  return bot;
}// export
