var commands = require('./commands');
var abilities = require('./abilities');

module.exports = function(config){
  var self = new Object();

  self = {
    botName : config.name || 'friday',
    canSpeak : config.canSpeak || true,
    listeningChannel : config.listeningChannel || 'chat message',
    sendersName : config.sendersName || 'prada',
    listening : false,
    msg: '',
    listen : function( socket ){
      // listens to the specified socket for
      // the listening channel's event to be called
      socket.on( self.listeningChannel, function(packege){
        self.listening = true;

        self.setMessage({
          msg : packege.msg,
          sender : packege.sender
        });
      });
    },
    setMessage : function(msg){
      // Repeats all the actions nessesary
      // after a mssage has been received

      // Set's the new msg and sender into the options
      self.sender = msg.sender || self.sender;
      if( !msg.msg ){
        console.log("You did not pass a new msg");
      } else {
        self.msg = msg.msg
      }

      self.testReport();
      self.readMessage();
    },
    testReport : function(){
      console.log(self.sender + " said: ", self.msg );
    },
    readMessage : function(){
      var msg = self.msg,
        command = commands;

      // go trough the available abilities
      for( var i=0; i<command.length; i++){
        // go trough that abilitie's commands
        for( var index=0; index<command[i].commands.length; index++ ){
          // if the command matches trigger it's ability
          // and pass it the context
          if ( msg.match( command[i].commands[index] ) ){
            command[i].ability({ msg: self.msg, from: self.sender });
            break;
          };
        }
      }
    },
    buildContext: function(){
      //return all the data needed for an action to work
    }
  }// self
 return self;
};
