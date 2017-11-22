import React from "react";
import io from "../../socket.io/socket.io.js"; /*I am really hacking this into react!*/
import $ from 'jquery'
import params from "./config/config.js"

//This function takes params from the configuration.
 //TODO this can be cleaned up a bit better
let  socket = io.connect(params.params.url,  { resource: params.params.path , reconnect:  params.params.reconnect })

export class Chatapp extends React.Component {

  constructor() {
    super();
    this.state =  {
        ChatMessage : "",
        data        : {}, /*Not used yet.*/
        Messages    : [],
        Username    : "",
  }

}

componentDidMount(){
this.RecvMessage();

}

RecvMessage(){
 socket.on('chat message', function(msg){
   console.log("Message Recvd " + msg)
//I will need to probably need to make JSON array.
 let parsedMessage = JSON.parse(msg);
 console.log(parsedMessage.Message)
//this.setState({Messages: this.state.Messages.concat({  Username:username, Message:message  })});

  this.setState({Messages: this.state.Messages.concat({  Username:parsedMessage.Username, Message:parsedMessage.Message  })});
  //this.setState({Messages: this.state.Messages.concat([parsedMessage.Message])}); // Keep this in case
    }.bind(this)
      )

}

//This just checks if 'Enter' was pressed. then, sets state of Username to the value in box.
UpdateUserName(evt){
  if (evt.key === 'Enter') {
  this.setState({
  Username: evt.target.value });
  //	console.log(this.state.ChatMessage)
  }
}






UpdateMessage(evt) {

	this.setState({
	ChatMessage: evt.target.value });
//	console.log(this.state.ChatMessage)
}



SendMessage (e,  Username,  Message) {
  e.preventDefault();
  let username = this.state.Username;
  let message  = this.state.ChatMessage;

  // Check if there message is empty. send if False then send
  if (message == ""){console.log("Type Something!")}


  else{
  socket.emit('chat message', JSON.stringify({Username:username , Message:message}))
  //socket.emit('chat message',this.state.Username +": "+ this.state.ChatMessage)
  console.log(this.state.Messages)
  this.setState({Messages: this.state.Messages.concat({  Username:username, Message:message  })});
  this.setState({ ChatMessage:""})
  }
}




render() {
if(this.state.Username ){
      return (

          <div className="ChatApp">
            <script src="../../socket.io/socket.io.js"></script>
            <div className="navbar center"><h1> Welcome to ChatApp (^=^)</h1></div>

            <div className="container center">
            <div id="box">
            <p id="messages" className="left"></p>


            {this.state.Messages.map((message, index) => (

            //  if(this.state.Messages[index].includes(this.state.Username)){console.log(this.state.Messages[index])
            //TODO
            // Some CSS needed here . What do you think?
            // <div class="chatitem"><div class="username"><li>Username:</li></div><div class="message"><li><Message></li></div></div>
            //
            //.chatitem li{ display:inline;} .chatitem .username li{ font-weight: bold; }


            //  <div className="chatitem"> <div className="username"></li></div><div className="message"> <li key={index}>{message.Username}: {message.Message}</li></div></div>
              <div className="chatitem" key={index}>
              <ul>
              <div className="ChatUsername"><li>{message.Username}: </li></div>
              <div className="chatMessage"><li> {message.Message}</li></div>
              </ul>
              </div>
          ))}


            </div>
            <div className="sender left">
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

      <div>
      <div className="navbar center"><h1> Welcome to ChatApp (^=^)</h1></div>

      <div className="container center">
      <div id="box">
      <p id="messages" className="left"></p>
      <p>Select User name please</p>
      <input id="chatuserinput"   autoFocus  ref="usernameimput"  autoComplete="off"  value={this.state.username} onKeyPress={evt => this.UpdateUserName(evt)} />

      </div>
      </div>
      </div>
      )

      }
    }
  }
