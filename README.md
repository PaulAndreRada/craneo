# <a href="http://paulandrerada.github.io/craneo/">Craneo</a>
### A Minimalist Bot Framework for node.js

### What it is
Craneo is a node framework for building a simple chat bot.

### What it’s not
Craneo is not an out-of-the-box, artificially intelligent bot; it is simply a framework for building a bot that responds to text-based commands with actions, prompts, or chat responses. In other words, here’s the skull, you supply the brain.


###Install
If you have node.js installed you can simply use npm to download it.
```bash 
npm install craneo
```

</br></br>
##Quick Start
</a>
###Create a response
Create a `hello-world.js` file inside your app's main directory.</br>
This function will serve as a response to a message saying 'hello'.
```js
var helloWorld = function(context){
  console.log( 'Hello world' );
  return false
}

module.exports = helloWorld;
```
</br>

###Create a list for your responses
In order for the bot to read your response you'll need to create a `response-list.js` file.
Inside it create the main `responseList` array and import the `hello-world.js` response function into this file.
```js
var helloWorld = require('./hello-world.js');

var responseList = [
  {
    name: 'helloWorld',
    commands: [],
    response: helloWorld
  }
]; 

module.exports = responseList;
```
The `responseList` array will serve as the default list for all of your bot’s commands and responses.
</br>

### Add a command to your response
The `commands` property inside a response object is an array that can be supplied any form of regular expression. </br>
Craneo uses these expressions to match a message with a response of your choosing. </br>
By adding the regular expression `/^(.*?(\hello\b)[^$]*)$/i` inside the command array, we are connecting any messages with the word "hello" to the `helloWorld` response function.

```js
    commands: [ /^(.*?(\hello\b)[^$]*)$/i ],
```
</br>



### Listen to messages
In your main app folder require Craneo along with your `response-list.js` file.
```js
var Craneo = require('craneo');
var defaultList = require('./response-list');
```
Initiate your own instance of a Craneo by passing it `defaultList` to a property named responseList. 
```js
var bot = Craneo({ responseList: defaultList }); 
```
Now you're ready to listen to any message by calling the listen method inside your bot and passing it a message along with any arguments that you would like to be passed down to your response.
```js
bot.listen('hello');
```

</br></br>
## Response Types

### Basic Response
As shown in our `hello-world.js` function, a basic response has a series of commands that can match with a users message to trigger a basic response function. These function types should return false. Returning false tells the bot to use the default `responseList` array for the following responses. As with all other response types a basic response will be passed a context argument with the objects bot and client.

### Response Chain
Think of a response chain as a conversation, once a response matches it returns a list or possible responses that are used instead of the default response.  This narrows the bot's available responses to a specific set of actions.  In order to end the response chain, provide a function with `return false`, this will tell Craneo to go back to using the default responseList.
```js
var responseChain = function( context ){

  // do your response’s action
  console.log('A Response chain has started' );

  // Return the following response objects to the bot in the same array format as the default response list
  var responseList = [
    {
      name: 'foo',
      response: function( context ){
          console.log('foo, ending chain');
          return false;
      },
      commands: [ /^(.*?(\bfoo\b)[^$]*)$/i ]
    },
    {
      name: 'bar',
      response: function( context ){
        console.log('bar, ending chain');
        return false;
      },
      commands: [/^(.*?(\bbar\b)[^$]*)$/i]
    },
    {
      name: 'commandNotFound',
      response: function(){
        console.log('command not found in chain');
        return responseList;
      },
      commands: [],
    }
  ];

  return responseList;
}

module.exports = responseChain;
```

### Read Chain
A Read Chain is used when you want to parse a message in detail. By returning the string `’read’` inside of a response along with a `responseList` property inside that same object the bot will read the message supplied a second time. This time using the responseList supplied inside of the matching object. This can be done in multiple sequences in order to get the most accurate reading of a message. 


```js 
var responseList = 
[
  {
    name: 'readChainExample',
    response: 'read',
    commands: [/^(.*?(\bshow\b)[^$]*)$/i],
    responseList:
    [
      {
        name: 'showSpaceInvaders',
        response: function(context){
          console.log('Space Invaders!');
        },
        commands: [/^(.*?(\binvaders\b)[^$]*)$/i],
      },
      {
        name: 'showBreakout',
        response: function(context){
          console.log('Breakout!');
          return false;
        },
        commands: [/^(.*?(\bbreakout\b)[^$]*)$/i],
      },
      {
        name:'commandNotFound',
        response: commandNotFound,
        commands: []
      }
    ]
  }
]
```
### Important Note
The response list is read in order, repeating a command [regex formatting and context] will result in a matching of the first command of that type only. If there is a need for a command that reads `’Show Gundam Wing’` and a command in a different object that reads `’Show MSG’` then use a read chain with a command of `’show’` then pass it a response list that holds the `Gundam Wing` response object and the `MSG` response object; As shown in the example above. This will match the 'show' command first then re-read the same message in order to match the following command.


</br></br>
## General Docs
### Passing down a context
All responses will get passed a context argument containing the bot's variables and the [your]client's arguments. The `context.bot` object will pass down the contents necessary for the bot to function; Mainly the message content `context.bot.message` and the current response list `context.bot.responseList`.  The `context.client` object will pass down whatever contents you pass to the bot’s `listen` method.
```js
// Make your own context variables
var responseArgs  = {
  userId : ‘RX78G’, 
  name:  ‘Amuro Ray’
  type: ‘Gundam’
}
// Pass them to the response
bot.listen( ‘hello’, responseArgs );
```

###Command Not Found
Craneo’s parser expects a response named `’commandNotFound’` inside any response list provided. This allows you to supply a custom function that will be triggered whenever the user adds a command that does not match with your response list’s options. This response should use the same formating as any other response object, but does not need any commands inside the commands array. 

```js
var responseList = [ 
  { 
   name: 'commandNotFound',
   response: function(context){...},
   commands: []
  } 
]
```


Created by Paul Rada & Licensed under MIT
