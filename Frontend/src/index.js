import React from "react";
import io from "./socket.io/socket.io.js"; /*I am really hacking this into react!*/
//import params from "./config/config.js"
import {emojify} from 'react-emojione';
import cookie from 'react-cookies';


//This function takes params from the configuration.
 //TODO this can be cleaned up a bit better


// I wish we could make this conditional , like if user chooses a valid name, then connect...
let socket = io.connect();


console.dir(socket.__proto__);



export default class Chatapp extends React.Component {
  constructor() {
    super();
    this.state =  {
        ChatMessage : "",
        Messages    : [],
        UsersinChat:  [],
        UpdatesFromServer:[],
        CurrentRoom: "Global",
        PrivateChatList:[],
        PrivateMessages: [{}],
        CurrentChat: ""

  }
}

setup(){
  if (this.props.config){}
  //This is probably a bad practice , but at least I get access to make this controllable by props!
  socket.io.uri             = this.props.uri;
  socket.io.opts.hostname   = this.props.hostname;
  socket.io.opts.path       = this.props.hardpath;
  socket.io.opts.resource   = this.props.resource;
  socket.io.opts.reconnect  = this.props.reconnect;
  socket.io.opts.secure     = this.props.secure;

}


componentWillMount(){
this.setup();


}

componentDidMount(){
this.RecvMessage();
this.RecvUpdateFromServer()
this.recvUserListFromServer()


}

recvUserListFromServer(){
  socket.on('user list', function(msg){
      console.log("user list " + msg)
        this.setState({UsersinChat: msg});

       }.bind(this)

         )

    }

RecvUpdateFromServer(){
 socket.on('chat update', function(msg){
 let parsedSMessage = JSON.parse(msg);
  this.setState({Messages: this.state.Messages.concat({Username:this.props.servername, Message:parsedSMessage.ServerMessage  })});
    }.bind(this)

      )

}


RecvMessage(){
 socket.on('chat message', function(msg){
 let parsedMessage = JSON.parse(msg);
  this.setState({Messages: this.state.Messages.concat({  Username:parsedMessage.Username, Message:parsedMessage.Message  })});
    }.bind(this)
      )

}

//This just checks if 'Enter' was pressed. then, sets state of Username to the value in box.
UpdateUserName(evt){
  if (evt.key === 'Enter' && evt.target.value !== "") {

  this.setState({
  Username: evt.target.value });
   this.SendUpdate(evt.target.value,evt.target.value+" Has Joined Chat!")
   }
}



UpdateMessage(evt) {
	this.setState({
	ChatMessage: evt.target.value });
//	console.log(this.state.ChatMessage)
}

SendUpdate(User,ServerMessage){
//  let username = this.state.Item; // I hve no clue why this variable is here....
  socket.emit('chat update', JSON.stringify({User:User, ServerMessage:ServerMessage}))

}

SendMessage (e,  Username,  Message) {
  e.preventDefault();
  let username = this.state.Username;
  let message  = this.state.ChatMessage;





  // Check if there message is empty. send if False then send
  if (message === ""){console.log("Type Something!")}

  else if(this.state.CurrentChat !== ""){
    socket.emit('Private message', JSON.stringify({Username:username ,PUser:this.state.CurrentChat, PSocketID:this.state.CurrentChat.SockID , Message:message}))
    this.setState({Messages: this.state.Messages.concat({  Username:username , Message:"(" + this.state.CurrentChat + ") "+ message  })});
    this.setState({ ChatMessage:""})
    console.log(this.state.CurrentChat)


//    console.log(myObject.User + " " + myObject.SockID)

/*    // I cannot for the life of me why this part of code exists...
      for (let i = 0; i < this.state.UsersinChat.length; i++){
      var myObject = JSON.parse(this.state.UsersinChat[i]);
      console.log("USER" + myObject.User)
      console.log("CurrentChat" + this.state.CurrentChat)
      if (myObject.User === this.state.CurrentChat){

        socket.emit('Private message', JSON.stringify({Username:username ,PUser:myObject.User, PSocketID:myObject.SockID , Message:message}))
        this.setState({Messages: this.state.Messages.concat({  Username:username, Message:message  })});
        this.setState({ ChatMessage:""})
        console.log(myObject.User + " " + myObject.SockID)
      }
      else{console.log("Not good... This means the User wasn't found.")}
    }*/
  }
  else{
      socket.emit('chat message', JSON.stringify({Username:username , Message:message}))
      this.setState({Messages: this.state.Messages.concat({  Username:username, Message:message  })});
      this.setState({ ChatMessage:""})
  }
}

Test_OpenPrivateChat(e){
  e.preventDefault();
  console.log("Adding Luser")
  console.log(this.state.PrivateChatList)
  let Luser = e.target.textContent;
  if(this.state.PrivateChatList.includes(Luser)){
    console.log("Chat with user already open!")

  }
  else{
  this.setState({PrivateChatList: this.state.PrivateChatList.concat(Luser)});
  }
}

OpenPrivateChat(e){
  e.preventDefault();
//  console.log("Adding Luser")
  console.log(this.state.PrivateChatList)
  //I worry that there would be vulnerbilities here ,.. In this current state the code wouldn't work I just think that
  let Luser = e.target.textContent.replace(/\s/g,'');//Bug here. There needs to be a cleaner way to get this value of wht the user clicked on!
  if(Luser === this.props.MainRoom.replace(/\s/g,'')){this.setState({CurrentChat:""})}
  else{
  this.setState({CurrentChat:Luser})
   }
}

ShowPrivateChat(){
//  e.preventDefault();
  console.log("I am showing the chat with...")

}


render() {


if(this.state.Username ){
      return (


<div className="ChatApp">
  <div className="chatNavbar center"><h1> {this.props.welcomemessage}</h1> <h2>::{this.state.CurrentChat}::</h2></div>
      <div className="container center">
              <div className="RoomsList">
               <ul className="ulRooms">
               <li><a   onClick={evt => this.OpenPrivateChat(evt)}>{this.props.MainRoom}</a></li>

                  { this.state.PrivateChatList.map((name, index) => (
                    <li  key={index}>  <a onClick={evt => this.ShowPrivateChat()}>  {name } </a></li>



                )) }


               </ul>
              </div>

              <div className="UsersList" >
              <ul className="ulUsers">
            { this.state.UsersinChat.map((UsersinChat, index) => (
              <li  key={index}>  <a  onClick={evt => this.OpenPrivateChat(evt)}>  {(JSON.parse(UsersinChat)['User'] )  } </a></li>

          )) }
          </ul>
          </div>
      </div>



            <div id="box">
            <p id="messages" className="left"></p>

            {this.state.Messages.map((message, index) => (
              <div className="chatitem" key={index}>
              <ul>
              <div className="ChatUsername"><li>{message.Username}:</li></div>
              <div className="chatMessage"><li>{emojify(message.Message)}</li></div>
              </ul>
              </div>
          ))}



            </div>

            <div className="lowerbox">
            <div className="sender left">
            <div className="select">
            <span className="arr">&#x263B;</span>


          </div>



                <form  onSubmit={this.SendMessage.bind(this)}> { /*/TODO The onChange Event below shouldn't be done like this. It should be onKeyPress and should look for Enterkey.. */}
                  <input id="myEmoji"  className="message" autoFocus  ref="ChatInput"  autoComplete="off"  value={this.state.ChatMessage} onChange={evt => this.UpdateMessage(evt)} />
                    <input  autoComplete="off" type="submit"  className="button" value="Send"/>
                </form>
            </div>
            </div>



                   </div>


              );
          }


else{
    return(
      <div className="ChatApp">
       <div className="chatNavbar center"><h1>{this.props.welcomemessage}</h1></div>
       <div className="container center">
     </div>

       <div id="box">
       <p id="messages" className="left"></p>
       <p>Select User name please</p>
       <input className="chatuserinput"   autoFocus  ref="usernameimput"  autoComplete="off"  value={this.state.username} onKeyPress={evt => this.UpdateUserName(evt)} />
       </div>



              </div>

      )

      }
    }
  }
