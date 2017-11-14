var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


io.on('connection', function(socket){
  console.log("connected")

    socket.on('chat message', function(msg){
    socket.broadcast.emit('chat message', msg);
    console.log('message: ' + msg);

  });
});

http.listen(9000, function(){
  console.log('listening on *:9000');
});
