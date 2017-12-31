import React from "react";
import io from "../../socket.io/socket.io.js";
import $ from 'jquery'

//const  socket = io.connect('https://localhost', {resource: '/socket.io' , reconnect: true })

const  socket = io.connect('http://localhost:9000'  ,{reconnect: true })

export class Test extends React.Component {

  constructor() {
    super();
    this.state =  {
        ChatMessage : "",
        data: {},
  }
}



componentDidMount(){
//Technically All JQUERY things should be rendered here... I am thinking we will need to hack it into existance.
}

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

      <div className="chatcontainer">
      <div id="box">
      <p id="messages" className="left"></p>
      </div>
      <div className="sender left">
          <form action="">
              <div id="myEmoji" className="message"></div>
              <input autoComplete="off" type="submit" className="button" value="Send"/>
          </form>
      </div>
    </div>



      <form name="ChatForm"  onSubmit={this.SendMessage.bind(this)}  >
      <input  autoFocus  ref="ChatInput"  autoComplete="off"  value={this.state.ChatMessage} onChange={evt => this.UpdateMessage(evt)} />
      <div className="returnmessage">{this.state.message} </div>
      <div className="buttons"> <button type="submit" value="Submit">Send Message</button></div>

       </form>
             </div>


        );
    }
}
