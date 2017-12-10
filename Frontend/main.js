import React from "react";
import { render } from "react-dom";
//import { BrowserRouter as Router, Route,  } from 'react-router-dom';
//import './public/images/favicon.ico';/*Doesn't work , not sure why....*/
//import cookie from 'react-cookies';



import { Chatapp } from "./components/chatapp";


class App extends React.Component {

    render() {

      return (// React can only ONE component render at a time . I you want to render more, then you need to add a div or someting.
        <Chatapp authenticated="true" MainRoom="Global Chat" servername="SlaBot" welcomemessage="Welcome to ChatApp (^=^)" uri="localhost:9000"  hardpath="/socket.io" reconnect="true" resource="/" secure="false" />


        );
    }
}


render(<App/>,window.document.getElementById("app"));
