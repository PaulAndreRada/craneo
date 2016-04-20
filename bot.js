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
    },
    state: {
      message: '',
      responseList: ResponseList,
      listening: false,
      responded: false,
      process: "init",
    },
    setState:function(nextState){
      // if "endAbility" has been returned
      // Top level merge
      bot.state = mergeObjects(bot.state, nextState);
      // Reset the responseList
      bot.state.responseList = bot.state.responseList === 'endAbility'?
        ResponseList:  bot.state.responseList;
      // log the state to help debugging
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
        "from" : {"name" : 'the dude'},
        "clientContext" : bot.state.clientContext
      }
    },
    listen: function(msg, context){
      bot.setState({
          message: msg,
          process : 'listening',
          clientContext : context || false,
        });
      bot.handleMessage();
    },
    direct:function(){},
  } // bot

  return bot;
}// export
