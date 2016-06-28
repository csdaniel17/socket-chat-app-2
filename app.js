var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http); //web socket has to work with http

app.get('/', function(req, res) {
  // res.send('<h1>Hello World</h1>');
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  // console.log('a user connected');
  // socket.on('disconnect', function() {
  //   console.log('user disconnected');
  // });
  //to send a message to everyone except a certain socket
  // socket.broadcast.emit('hi');

  //listen for chat messages
  socket.on('chat message', function(msg) {
    // console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

http.listen(3000, function () {
  console.log('listening on 3000');
});
