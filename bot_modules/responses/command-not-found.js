var responseList = require('../response-list');

module.exports = function(){
  var list = responseList,
      length = list.length;

  console.log('Not receiving you captain, next time say somethign like this:');
  for(var i=0; i<length; i++){
      var commandList = list[i].highlightCommands;
      for(var index=0; index<commandList.length; index++){
        console.log(list[i].highlightCommands[index]);
      }
  };
  return 'endAbility';
};
