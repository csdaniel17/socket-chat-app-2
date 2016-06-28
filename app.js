var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http); //web socket has to work with http

app.get('/', function(req, res) {
  // res.send('<h1>Hello World</h1>');
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket, msg) {
  // console.log('a user connected');
  //show when a user enters
  io.emit('enter message', msg);

  //to send a message to everyone except a certain socket
  // socket.broadcast.emit('hi');

  //listen for chat messages
  socket.on('chat message', function(msg) {
    // console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  //show when a user leaves
  socket.on('disconnect', function(msg) {
    // console.log('user disconnected');
    io.emit('exit message', msg);
  });
});

http.listen(3000, function () {
  console.log('listening on 3000');
});
