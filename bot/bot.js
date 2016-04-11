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
        console.log('socket triggered');
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
    },
    testReport : function(){
      console.log(self.sender + "said: ", self.msg );
    },
    readMessage : function(){
      // search for all the possible commands the message
        // if one hits, search for all the possible actions fo that command
          // if non hit do the basic command?
      // If no commands are hit respond with the possible actions concatinated
    },
  }// self
 return self;
};
