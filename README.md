#Craneo
### A Minimalist Bot Framework for node.js

### What it is
The basic command parsing structure for any small to medium sized bot you intend to make.
Craneo serves as a minimalistic back-end bot framework that specifically reads commands and triggers responses with the use of regular expressions. 

### What it’s not
Craneo is not an out of the box natural language intelligence for your commands, it’s a structure for parsing different types of commands. In other word’s - Here’s the skull, you supply the brain.


###Install
If you have node.js installed you can simply use npm to download it.
```bash 
npm install craneo
```

##Quick Start
</br>
###Create a response
Create a `hello-world.js` file inside the main directory.</br>
This function will serve as the first response your bot will have.
```js
var helloWorld = function(context){ 
  console.log( 'Hello world' );
  return false
}
```
</br>

###Create a list for your responses
In order for the bot to read your response you'll need to create a `response-list.js` file.
Inside `response-list.js` create the main response list array and require the `hello-world.js` response function into this file. It will serve as the root response list for all of your bot’s commands and responses.  
```js
var helloWorld = require('./hello-world.js');

var responseList = [
  {
    name: 'helloWorld',
    commands: [ /^(.*?(\hello\b)[^$]*)$/i ],
    response: hello
  }
]; 

module.exports = responseList;
```
</br>

### Create a commands list for your response
The `commands:` inside a response object must be supplied using regular expressions. </br>Craneo uses regular expressions to match any command supplied inside the command list with the received message.
</br> By adding the regular expresion `/^(.*?(\hello\b)[^$]*)$/i` inside our command list, we set up our bot to respond with our hello world function to any commands that include the string 'Hello'.

### Listen to messages
In your main app folder require Craneo along with your `response-list.js` file.
```js
var Craneo = require('craneo');
var responseList = require('./response-list');
```
Initiate your own instance of a Craneo by passing it your `responseList` array inside of an object with a property named responseList. 
```js
var bot = Craneo({ responseList: responseList }); 
```
Now you're ready to listen to any message by calling the listen method inside your bot and passing it a message and any arguments that you would like to be passed down to your response.
```js
bot.listen('hello');
```


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

## Response Types

### Basic Response
As shown in our `hello-world.js` function, a basic response has a series of commands that can match with a users message to trigger a basic response function. These function types should return false. Returning false tells the bot to use the default `responseList` array for the following responses. As with all other response types a basic response will be passed a context argument with the objects bot and client.

### Response Chain
Think of a response chain as a conversation, once a response matches it returns a list or possible responses that are used instead of the default response.  This narrows the bot's available responses for a specific set of actions.  In order to end the response chain, provide a function with `return false`, this will tell Craneo to go back to using the default responseList.
```js
var responseChain = function( context ){ 

  // do your response’s action
  console.log(‘response chain started’ ); 
  
  // Return the following response objects to the bot in the same array format as the response list
  return [
    { 
      name: ‘foo’,
      response: function(){ console.log(‘foo’); }, 
      commands: […]
    },
    { 
      name: ‘bar’,
      response: function(){ console.log(‘bar’); }, 
      commands: […]
    }
  ]
} 
```

### Read Chain
A Read Chain is used when you want to parse a message in detail. By returning the string `’read’` inside of a response along with a `responseList` property inside that same object the bot will read the message supplied a second time. This time using the responseList supplied inside of the matching object. This can be done in multiple sequences in order to get the most accurate reading of a message. 


```js 
var responseList = [
  {
    name: “show”,
    response: ‘read’, 
    command: [ … ],
    responseList: 
    [ 
      { 
	name: ‘Gundam Wing’
	response: function(){ console.log(‘if we weren’t idiots, we wouldn’t be soldiers.’); },
	command: […]
      },
      { 
	name: ‘MSG’
	response: function(){ console.log(’The OG Gundam’); 
	command: […]
      }
    ]
]

### Important Note
The response list is read in order, repeating a command [regex formatting and context] will result in a matching of the first command of that type only. If there is a need for a command that reads `’Show Gundam Wing’` and a command in a different object that reads `’Show MSG’` then use a read chain with a command of `’show’` then pass it a response list that holds the `Gundam Wing` response object and the `MSG` response object; As shown in the example above. This will match the 'show' command first then re-read the same message in order to match the following command.


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


Created by Paul Rada </br>
Licence MIT
