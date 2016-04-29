# Craneo - A Bare-bones bot structure for Node
A Minimalist command and response bot structure that scales for any project.


## Installation

```bash
$ npm install craneo
```
</br>
## Getting Started

Let's start by creating a response for our bot called `hello.js`.
#### Create a Response
```js
var hello = function(context){ 
  console.log( 'oh, hello world' );
  return false
}
```
</br>
#### Create a Response List
Now let's store our response inside a response list that the craneo bot will read trough after receiving a message.
</br>For simplicity's sake let's call this file `response-list.js`.

Inside `response-list.js` create the main response list array and require any response functions into this file. It will serve as your default bottle neck for all of your commands and responses.  

```js
var hello = require('./hello');

var responseList = [
// this is a response object
  {
    name: 'helloWorld',
    commands: [ /^(.*?(\Hello\b)[^$]*)$/i ],
    response: hello,
  }
]; 

module.exports = responseList;
```
</br>
#### Create a Commands List
The `commands:` inside a response object must be supplied using regular expressions. </br>Craneo uses regular expresions to match any command supplied inside the command list with the received message.
</br> By adding the regular expresion `/^(.*?(\Hello\b)[^$]*)$/i` inside our command list, we set up our bot to respond with our hello world function to any commands that include the string 'Hello'.

</br>
#### Listen to Messages
In your main app folder you can require craneo and your `response-list.js` file.
```js
var Craneo = require('craneo');
var responseList = require('./response-list');
```
Initiate your own instance of a craneo bot with by passing it your responseList array inside of an object. 
```js
var bot = Craneo({ responseList: responseList }); 
```
Now you're ready to listen to any message by calling the listen method inside your bot and passing it a message and any arguments that you would like to be passed down to your response.
```js
bot.listen('hello');
```

