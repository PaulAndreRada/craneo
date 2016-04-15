var AbilityRoster = require('./ability_roster');


module.exports = function(config){
  var bot = new Object();

  bot = {
    botName : config.name || 'friday',
    canSpeak : config.canSpeak || true,
    listeningChannel : config.listeningChannel || 'chat message',
    sender : config.sendersName || 'prada',
    msg: '',
    listening: false,
    abilityMode: false,
    listen : function( socket ){
      // listens to the specified socket for
      // the listening channel's event to be called
      socket.on( bot.listeningChannel, function(msg){
        bot.listening = true;
        bot.setMessage(msg);
        bot.readMessage();
      });
    },
    setMessage : function(msg){
      // Set's the new msg into the options
      if( !msg ){
        console.log("You did not pass a new msg");
      } else {
        bot.msg = msg;
      }
    },
    testReport : function(){
      console.log(bot.sender + " said: ", bot.msg );
    },
    readMessage : function(){
      var msg = bot.msg,
        roster = AbilityRoster,
        context = bot.buildContext();
        console.log( msg );
      // go trough the available abilities
      for( var i=0; i<roster.length; i++){
        // go trough that abilitie's commands
        for( var index=0; index<roster[i].commands.length; index++ ){
          // if the command matches trigger it's ability
          // and pass it the context
          if ( msg.match( roster[i].commands[index] ) ){
            roster[i].ability(context);
            break;
          };
        }
      }
    },
    buildContext: function(){
      // Creates the object to pass down to all abilities
      return {
        msg: bot.msg,
        from: bot.sender,
        mode: bot.abilityMode
      }
    }
  }// bot
 return bot;
};
