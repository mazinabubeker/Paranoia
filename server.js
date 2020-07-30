// socket.broadcast.emit('event', data)
// socket.on('event', data)
var express = require('express');
var socket = require('socket.io');
var app = express();
var server = app.listen(process.env.PORT || 3000);
app.use(express.static('public'));
var io = socket(server);
io.sockets.on('connection', newConnection);

var users = {};

function newConnection(socket){
  console.log("Connected: " + socket.id);
  socket.on('create_lobby', id=>{
    if(users[id]){
      console.log("lobby already exists");
      socket.emit('check_lobby_response', false);
    }else{
      users[id] = [];
      console.log("Lobby " + id + " created.");
      socket.join(id);
      socket.emit('check_lobby_response', true);
    }
  });

  socket.on('add_user', data=>{
    if(users[data.data2].includes(data.data1)){
      socket.emit('username_attempt', false)
    }else{
      socket.to(data.data2).emit('user_add', data.data1);
      socket.emit('username_attempt', true)
    }
  });

   socket.on('join_lobby', id=>{
    if(users[id]){
      socket.join(id);
      socket.emit('check_join_response', true);
    }else{
      socket.emit('check_join_response', false);
    }
  });
}

