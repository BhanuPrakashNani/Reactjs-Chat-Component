var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//One problem here is that there isn't a strong registration system...


let ActiveUsers = [];

/*function getSocketFromUser(user) {
let data = JSON.parse(ActiveUsers);
  //const users = data.filter(o => o.User === user);

const users = data.filter();
console.log(users)

  return users.length > 0 ? users[0].SockID : null;
}*/


io.on('connection', function(socket){
  if (ActiveUsers.length < 0 ){console.log("No Users In chat")}
  io.sockets.emit('user list', ActiveUsers);
  console.log("connected "+ socket.id) // Uncomment this later.


//Here I wantto divide up soket messages into types.
    socket.on('chat message', function(msg){
    socket.broadcast.emit('chat message', msg);
//    console.log('Message: ' + msg);

  }),

  socket.on('Private message', function(msg){
  obj = JSON.parse(msg);
  //console.log(obj)
  for (var i = 0; i < ActiveUsers.length; i++) {
    let jsonr = JSON.parse(ActiveUsers[i])
    if(obj.PUser === jsonr.User){
      //console.log(obj.PUser)
      //console.log(jsonr.User)
      //console.log(jsonr.SockID)
      console.log(msg)
    //  console.log(obj.Username) //Send that this person sent a message.
      //Need to make a send here... Me thinks
      //socket.broadcast.to(jsonr.SockID).emit('chat message', msg);
      console.log(typeof(msg))

      let Parsed_Message = JSON.parse(msg)
      console.log(Parsed_Message.Username)
      console.log(Parsed_Message.Message)
      let PMessage = {"Message": Parsed_Message.Message, "Username": "Private Message From "+Parsed_Message.Username};//This needs to be fixed.
      console.log(PMessage)
      //socket.emit('chat update', JSON.stringify({User:User, ServerMessage:ServerMessage}))

      socket.broadcast.to(jsonr.SockID).emit('chat message',  JSON.stringify({"Message": Parsed_Message.Message, "Username": Parsed_Message.Username +" (Whispers) " }))

    }


//    console.log(obj.User)
//    console.log(jsonr.User)
      //  console.log(jsonr.User)
  }

//let socketid = null;

//  socket.broadcast.to(socketid).emit('chat message', msg);
//  socket.broadcast.emit('chat message', msg);
//  console.log(ActiveUsers)
//  console.log(obj);

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
