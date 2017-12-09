var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//One problem here is that there isn't a strong registration system...


let ActiveUsers = [];


io.on('connection', function(socket){
  if (ActiveUsers.length < 0 ){console.log("No Users In chat")}
  io.sockets.emit('user list', ActiveUsers);
  console.log("connected "+ socket.id) // Uncomment this later.


//Here I wantto divide up soket messages into types.
    socket.on('chat message', function(msg){
    socket.broadcast.emit('chat message', msg);
    console.log('Message: ' + msg);

  }),


  socket.on('chat update', function(msg){
  let parsedUMessage = JSON.parse(msg);
  ActiveUsers.push(JSON.stringify({User:parsedUMessage.User , SockID:socket.id}))
  socket.broadcast.emit('chat update', msg);
  console.log('Message: ' + msg);
  io.sockets.emit('user list', ActiveUsers);     });










}); // Keep your message types inside this above.





http.listen(9000, function(){
  console.log('listening on *:9000');
});
