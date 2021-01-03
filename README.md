
# <a href="http://paulandrerada.github.io/craneo/">Craneo</a>
### A Minimalist Bot Framework for node.js

<b>What it is:</b>
Craneo is a node framework for building a simple chat bot.</br>
<b>What it’s not:</b>
Craneo is not an out-of-the-box, artificially intelligent bot; it is simply a framework for building a bot that responds to text-based commands with actions, prompts, or chat responses. In other words, here’s the skull, you supply the brain.
</br></br>


<img src="https://github.com/PaulAndreRada/craneo/blob/master/Craneo_preview.gif" alt="Create bot apps" width="500" height="auto">

### Install
If you have node.js installed you can simply use npm to download it.
```bash 
npm install craneo
```

</br></br>

## Quick Start
Build a hello world bot program in 3 steps then pass it to a Craneo instance.
First install Craneo then create a `bot.js` file in an empty directory. 

### Create a response
This function will be our bot’s response to the words ‘hello’ and ‘arise’. 
```js
var helloWorld = function(){ 
  console.log( "Hello world!" ); 
  return false;
}
```
</br>

### Create a response list
In order to have the bot respond to multiple commands we will create a `responseList` array under our `helloWorld` function. This array will have a response object named `hello` and another function named `commandNotFound`. This will serve as our default response when no other response matches.
```js
var responseList = [
  {
    name: "hello",
    response: helloWorld, 
    commands: []
  },
  {
    name: "commandNotFound",
    response: function(){ console.log( "I didn’t get that.");  },
    commands: []
  }
];
```
</br>

### Add a command
The `commands` property inside a response object expects an array of regular expressions that will match a response to the incoming message.
```js
// add your commands inside of the response named hello
    commands: [ 
      /^(.*?(\bhello\b)[^$]*)$/i,
      /^(.*?(\barise\b)[^$]*)$/i
    ]
```
</br>

### Create a Craneo Instance
Now that we built the bot’s commands and responses. 
The only thing left to do is add them to an instance of Craneo and listen to any incoming messages.
```js
var Craneo = require("craneo");
var myBot = Craneo({ responseList: responseList }); 

myBot.listen( "arise" );
```
</br>

### Have a chat
Test out your hello world program by running `node app.js` on your terminal. The bot should respond with ‘Hello world!’ in your console. Thats it, you have created your first bot!

</br></br>
## Template
Looking for a quick way to start your bot?
<a href="https://github.com/PaulAndreRada/craneo-template.git">Download this template</a>

</br></br>
## Docs

### Basic Response
As shown in our `hello-world.js` function, a basic response has a series of commands that can match with a users message to trigger a basic response function. These function types should return false. Returning false tells the bot to use the default `responseList` array for the following responses. As with all other response types a basic response will be passed a context argument with the objects bot and client.
<br>

### Response Chain
Think of a response chain as a conversation, once a response matches it returns a list or possible responses that are used instead of the default response.  This narrows the bot's available responses to a specific set of actions.  In order to end the response chain, provide a function with `return false`, this will tell Craneo to go back to using the default responseList.
```js
var responseChain = function( context ){

  // do your response’s action
  console.log("A Response chain has started" );

  // Return the following response objects to the bot in the same array format as the default response list
  var responseList = [
    {
      name: "foo",
      response: function( context ){
          console.log("foo, ending chain");
          return false;
      },
      commands: [ /^(.*?(\bfoo\b)[^$]*)$/i ]
    },
    {
      name: "bar",
      response: function( context ){
        console.log("bar, ending chain");
        return false;
      },
      commands: [/^(.*?(\bbar\b)[^$]*)$/i]
    },
    {
      name: "commandNotFound",
      response: function(){
        console.log("command not found in chain");
        return responseList;
      },
      commands: [],
    }
  ];

  return responseList;
}

module.exports = responseChain;
```
<br>

### Read Chain
A Read Chain is used when you want to parse a message in detail. By returning the string `’read’` inside of a response along with a `responseList` property inside that same object the bot will read the message supplied a second time. This time using the responseList supplied inside of the matching object. This can be done in multiple sequences in order to get the most accurate reading of a message. 
```js 
var responseList = 
[
  {
    name: "readChainExample",
    response: "read",
    commands: [/^(.*?(\bshow\b)[^$]*)$/i],
    responseList:
    [
      {
        name: "spaceInvaders",
        response: function(context){
          console.log("Space Invaders!");
        },
        commands: [/^(.*?(\binvaders\b)[^$]*)$/i],
      },
      {
        name: "breakout",
        response: function(context){
          console.log("Breakout!");
          return false;
        },
        commands: [/^(.*?(\bbreakout\b)[^$]*)$/i],
      },
      {
        name:"commandNotFound",
        response: commandNotFound,
        commands: []
      }
    ]
  }
]
```
### Repeating commands 
The response list is read in order, repeating a command [regex formatting and context] will result in a matching of the first command of that type only. If there is a need for a command that reads `’Show Sapce Invaders’` and a command in a different object that reads `’Show Breakout’` then use a read chain with a command of `’show’` then pass it a response list that holds the `spaceInvaders` response and the `breakout` response; As shown in the example above. This will match the 'show' command first then re-read the same message in order to match the following command.
</br>

### Passing down a context
All responses will get passed a context argument containing the bot's variables and [your] client's arguments. The `context.bot` object will pass down the contents necessary for the bot to function; Mainly the message content `context.bot.message` and the current response list `context.bot.responseList`.  The `context.client` object will pass down whatever contents you pass to the bot’s `listen` method.
```js
// Make your own context variables
var responseArgs  = {
  userId : "RX78G", 
  name:  "Amuro Ray",
  type: "Gundam"
}
// Pass them to the response
bot.listen( "Gundams fight!", responseArgs );
```
<br>

### Command Not Found
Craneo’s parser expects a response named `’commandNotFound’` inside any response list provided. This allows you to supply a custom function that will be triggered whenever the user adds a command that does not match with your response list’s options. This response should use the same formating as any other response object, but does not need any commands inside the commands array. 

```js
var responseList = [ 
  { 
   name: "commandNotFound",
   response: function(context){...},
   commands: []
  } 
]
```

<br><br><br>
## More coming soon
Created and maintained by Paul Rada & Licensed under MIT 2016
