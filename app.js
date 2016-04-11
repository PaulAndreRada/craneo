var app = require('express')();
var http = require("http").Server(app);
var io = require('socket.io')(http);

// import the bot
var config = require('./bot/config');
var Bot = require('./bot/bot')(config);

var __dirname = '/Users/Viki/gitHubReps/fridai-bot/public'

// render the index
app.get('/', function(req, res){
 res.sendFile(__dirname + '/index.html');
});


io.on('connection',function(socket){
  console.log('a user connected');

  // activate the bot
  Bot.listen(socket);

  // log disconnect
  socket.on('disconnect',function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


















/* basic server
var fs = require('fs');
var path = require('path');
var mime = require('mime');

function send404(response){
  response.writeHead(404, {"Content-Type" : "text/plain"});
  response.write("Error 404: resource not found");
  response.end();
}

function sendPage( response, filePath, fileContents ){
  response.writeHead(200, {"Content-Type" : mime.lookup(path.basename(filePath))});
  response.end(fileContents);
}

function serverWorking(response, absPath) {
  fs.exists(absPath, function(exist){
    if(exist) {
      fs.readFile(absPath, function(err, data){
	      if(err){  send404(response); }
	else { sendPage(response, absPath, data); }
      });//fs readfile
    } else {
	send404(response);
    }//if exist or else
  });//fs exist
}//server working


// Create the server
var server = http.createServer(function(request, response){
  // set the filepath
  // if the slash changes
  var filePath = false;
  if(request.url == '/'){
    filePath = "public/index.html";
  } else {
    filePath = "public" + request.url;
  }
  // set the absolute path
  var absPath = "./" + filePath;
  // start the server
  serverWorking(response, absPath);
});

var port_number = server.listen(process.env.PORT || 3000);
*/
