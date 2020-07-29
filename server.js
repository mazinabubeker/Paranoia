
// socket.broadcast.emit('event', data)
// socket.on('event', data)
var express = require('express');
var socket = require('socket.io');
var io = socket(server);
io.sockets.on('connection', newConnection)
var app = express();
var server = app.listen(process.env.PORT || 3000);
app.use(express.static('public'));


var users = {};

function newConnection(socket){
  console.log("Connected: " + socket.id);
  socket.on('create_lobby', checkLobby);
  function checkLobby(id){
    if(users[id]){
      console.log("lobby already exists");
      socket.emit('check_lobby_response', false);
    }else{
      users[id] = [];
      console.log("Lobby " + id + " created.");
      socket.emit('check_lobby_response', true);
    }
  }
}