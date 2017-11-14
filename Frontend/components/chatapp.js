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
  this.setState({Messages: this.state.Messages.concat([msg])});
    }.bind(this)
      )
}

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



SendMessage (e) {
  e.preventDefault();
  socket.emit('chat message',this.state.Username +": "+ this.state.ChatMessage)
  this.setState({Messages: this.state.Messages.concat([this.state.Username +": "+ this.state.ChatMessage])});
  this.setState({ ChatMessage:""})
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
              <li key={index}>{message}</li>
          ))}


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
