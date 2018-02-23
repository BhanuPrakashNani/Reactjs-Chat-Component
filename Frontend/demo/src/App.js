import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import  Chatapp    from "./chatapp";


class App extends Component {
  render() {
    return (
      <div className="App">

        <Chatapp authenticated="true" MainRoom="Global Chat"  servername="SlaBot" welcomemessage="Welcome to ChatApp (^=^)" uri="http://localhost:9000"  hardpath="/socket.io" reconnect="true" resource="/" secure="false" />

      </div>
    );
  }
}

export default App;
