
// socket.broadcast.emit('event', data)
// socket.on('event', data)

var express = require('express');
var socket = require('socket.io');
var app = express();
var server = app.listen(process.env.PORT || 3000);
app.use(express.static('public'));


var io = socket(server);
io.sockets.on('connection', newConnection)

function newConnection(socket){
  console.log("Connected: " + socket.id);
}