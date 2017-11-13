import React from "react";
import io from "../../socket.io/socket.io.js"; /*I am really hacking this into react!*/
import $ from 'jquery'
import params from "./config/config.js"


//TODO Add JQUERY to this . I am not 100% sure that it would work , but I think for at least receiving the information back it's an ok idea.


//This function takes params from the configuration.
 //TODO this can be cleaned up a bit better
let  socket = io.connect(params.params.url,  { resource: params.params.path , reconnect:  params.params.reconnect })

export class Chatapp extends React.Component {

  constructor() {
    super();
    this.state =  {
        ChatMessage : "",
        data: {},
  }
}



componentDidMount(){
//Technically All JQUERY things should be rendered here... I am thinking we will need to hack it into existance.


this.RecvMessage();
}


RecvMessage(){
 socket.on('chat message', function(msg){console.log("Message Recvd " + msg)} )


}


UpdateMessage(evt) {
	this.setState({
	ChatMessage: evt.target.value });
//	console.log(this.state.ChatMessage)
}



SendMessage (e) {
  e.preventDefault();

  socket.emit('chat message',this.state.ChatMessage)
  this.setState({ ChatMessage:""})


}


render() {


return (
    <div>
      <script src="../../socket.io/socket.io.js"></script>
      <div className="navbar center"><h1> Welcome to ChatApp (^=^)</h1></div>

      <div className="container center">
      <div id="box">
      <p id="messages" className="left"></p>
      </div>
      <div className="sender left">
          <form  onSubmit={this.SendMessage.bind(this)}>
            <input id="myEmoji"  className="message" autoFocus  ref="ChatInput"  autoComplete="off"  value={this.state.ChatMessage} onChange={evt => this.UpdateMessage(evt)} />
              <input  autoComplete="off" type="submit"  className="button" value="Send"/>
          </form>
      </div>
    </div>

             </div>


        );
    }
}
