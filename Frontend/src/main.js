import React, { Component } from 'react';
import   { Chatapp }  from '../chatapp';



class App extends Component {
  render() {
    return (
        <Chatapp authenticated="true" MainRoom="Global Chat" servername="SlaBot" welcomemessage="Welcome to ChatApp (^=^)" uri="localhost:9000"  hardpath="/socket.io" reconnect="true" resource="/" secure="false" />
    );
  }
}

export default App;
