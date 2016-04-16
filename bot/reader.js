var Abilities = require('./abilities');


module.exports = function(config){
  var bot = new Object();

  bot = {
    props: {
      botName : config.name || 'friday',
      listeningEvent : config.listeningEvent || 'chat message',
      sender : config.sendersName || 'prada',
      listening: false,
      responded: false
    },
    state: {
      message: '',
      response: false
    },
    setState: function(newState){
      var state = newState;
      // if new message, say if it has been responded
      state.message? bot.props.responded = false: null;
      // update the state
      bot.state = {
        message: state.message || bot.state.message,
        response: state.response || bot.state.response
      }
      bot.handleStateChange();
    },
    handleStateChange: function(){
      // only run if there's a new message
      // this prevents infinite looping
      console.log( 'state', bot.state );
      console.log( 'have you responded?', bot.props.responded );
      if( !bot.props.responded ){
        console.log( 'passed responded');
        if( bot.state.response ){

          bot.respond();
        } else {
                  console.log( 'command sent to match');
          bot.matchCommand();
        }
      }
      console.log('no new msg, STOP');
    },
    matchCommand: function(){
      var abilities = Abilities,
        alength = abilities.length,
        message = bot.state.message;

      // go trough the available abilities
      for( var i=0; i<alength; i++){
        var ability = abilities[i],
          commands = ability.commands;
        // go trough that abilitie's commands
        for( var index=0; index<commands.length; index++ ){
          // if the command matches, set it's response
          // and pass it the state and save it's returning context
          if ( message.match( commands[index] ) ){
            bot.setState({ response: ability.response });
            break;
          };
        }
      }
    },
    respond: function(){
      bot.props.responded = true;
      bot.catchBubbleUp( bot.state.response(bot.state, bot.props) );
    },
    catchBubbleUp: function( newResponse ){
      // false if ability is done || the following function if not
      bot.setState({ response: newResponse });
    },
    // socket.io specific
    listen : function( socket ){
      console.log( 'bot is listening for:'+ bot.props.listeningEvent );
      bot.props.listening = true;
      // listens to the specified socket for
      // the listening channel's event to be called
      socket.on( bot.props.listeningEvent, function(msg){
        bot.setState({ message: msg });
      });
    },
  }// bot
 return bot;
};
