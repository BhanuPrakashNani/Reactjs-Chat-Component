import React from "react";
import io from "../../socket.io/socket.io.js"; /*I am really hacking this into react!*/
import params from "./config/config.js"
import {emojify} from 'react-emojione';




//This function takes params from the configuration.
 //TODO this can be cleaned up a bit better


//let  socket = io.connect(params.params.url,  { resource: params.params.path , reconnect:  params.params.reconnect })
//I wish I could make this dynaic....
//Well I may have figured out how to do this.
let socket = io.connect();


export class Chatapp extends React.Component {



  constructor() {
    super();
    this.state =  {
        ChatMessage : "",
        Messages    : [],
  }

}


setup(){
  if (this.props.config){}
  //This is probably a bad practice , but at least I get access to make this controllable by props!
  //
  socket.io.uri = this.props.uri;
  socket.io.opts.hostname = this.props.hostname;
  socket.io.opts.path = this.props.hardpath;
  socket.io.opts.resource = this.props.resource;
  socket.io.opts.reconnect = this.props.reconnect;
  socket.io.opts.secure = this.props.secure;



}


componentWillMount(){

this.setup();



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
/*.ChatApp {
    height: 600px;
    max-height: 600px;
    width: 40%;
}*/



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
              <div className="chatitem" key={index}>
              <ul>
              <div className="ChatUsername"><li>{message.Username}:</li></div>
              <div className="chatMessage"><li>{emojify(message.Message)}</li></div>
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
      <div className="ChatApp">
      <div className="navbar center"><h1> Welcome to ChatApp (^=^)</h1></div>

      <div className="container center">
      <div id="box">
      <p id="messages" className="left"></p>
      <p>Select User name please</p>
      <input id="chatuserinput"   autoFocus  ref="usernameimput"  autoComplete="off"  value={this.state.username} onKeyPress={evt => this.UpdateUserName(evt)} />

      </div>
      </div>
      </div>
      </div>
      )

      }
    }
  }
