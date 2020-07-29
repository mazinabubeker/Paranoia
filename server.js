
// socket.broadcast.emit('event', data)
// socket.on('event', data)

var express = require('express');
var socket = require('socket.io');
var app = express();
var server = app.listen(process.env.PORT || 3000);
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));


var users = {};

app.post('/create_lobby', (req, res) => {
  if(users[req]){
    res.send("false");
    console.log("EXISTS")
  }else{
    users[req] = [];
    res.send("true");
    console.log("DOESNT EXIST")
    console.log(users);
  }
  res.end();
});  


var io = socket(server);
io.sockets.on('connection', newConnection)

function newConnection(socket){
  console.log("Connected: " + socket.id);
}

// app.post('/query_post', (req, res) => {
//   res.send(req.body);
//   res.end();
// });  

// app.get('/query_get', (req, res) => {
//   res.send(nextFlashTime.toString());
//   res.end();
// });