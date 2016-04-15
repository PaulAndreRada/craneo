var AbilityRoster = require('./ability_roster');


module.exports = function(config){
  var bot = new Object();

  bot = {
    botName : config.name || 'friday',
    canSpeak : config.canSpeak || true,
    listeningChannel : config.listeningChannel || 'chat message',
    sendersName : config.sendersName || 'prada',
    listening : false,
    msg: '',
    listen : function( socket ){
      // listens to the specified socket for
      // the listening channel's event to be called
      socket.on( bot.listeningChannel, function(packege){
        bot.listening = true;
        bot.setMessage({
          msg : packege.msg,
          sender : packege.sender
        });
        bot.readMessage();
      });
    },
    setMessage : function(msg){
      // Repeats all the actions nessesary
      // after a mssage has been received
      // Set's the new msg and sender into the options
      bot.sender = msg.sender || bot.sender;
      if( !msg.msg ){
        console.log("You did not pass a new msg");
      } else {
        bot.msg = msg.msg
      }
    },
    testReport : function(){
      console.log(bot.sender + " said: ", bot.msg );
    },
    readMessage : function(){
      var msg = bot.msg,
        roster = AbilityRoster;

      // go trough the available abilities
      for( var i=0; i<roster.length; i++){
        // go trough that abilitie's commands
        for( var index=0; index<roster[i].commands.length; index++ ){
          // if the command matches trigger it's ability
          // and pass it the context
          if ( msg.match( roster[i].commands[index] ) ){
            roster[i].ability({ msg: bot.msg, from: bot.sender });
            break;
          };
        }
      }
    },
    buildContext: function(){
      //return all the data needed for an action to work
    }
  }// bot
 return bot;
};
