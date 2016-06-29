var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http); //web socket has to work with http
// var usernames = [];

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {

  socket.on('new user', function(username) {
    socket.username = username;
    io.emit('join', username);
  });

  socket.on('disconnect', function() {
    io.emit('leave', socket.username);
  });

  socket.on('chat message', function(msg) {
    // console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  // socket.on('new user', function(data, callback) {
  //   //check if username is valid
  //   //is the username already in array?
  //   if (usernames.indexOf(data) != -1) {
  //     callback(false);
  //   } else {
  //     //set callback to true
  //     callback(true);
  //     //add it to array
  //     //first store username of each user in the socket itself
  //     socket.username = data;
  //     console.log(socket.username);
  //     usernames.push(socket.username);
  //     console.log(usernames);
  //     io.emit('usernames', usernames);
  //   }
  //   io.emit('enter message', msg);
  // });

});

http.listen(3000, function () {
  console.log('listening on 3000');
});
