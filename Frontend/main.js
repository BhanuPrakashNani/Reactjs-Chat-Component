import React from "react";
import { render } from "react-dom";
//import { BrowserRouter as Router, Route,  } from 'react-router-dom';
//import './public/images/favicon.ico';/*Doesn't work , not sure why....*/
//import cookie from 'react-cookies';


/*
  hostname
  :
  "localhost"
  path
  :
  "/socket.io"
  port
  :
  "9000"
  reconnect
  :
  "true"
  resource
  :
  "/bumblebeatuna"
  secure
  :
  false
  */



import { Chatapp } from "./components/chatapp";


class App extends React.Component {

    render() {

      return (// React can only ONE component render at a time . I you want to render more, then you need to add a div or someting.
        <Chatapp authenticated="true" uri="localhost:9000"  hardpath="/socket.io" reconnect="true" resource="/" secure="false"/>


        );
    }
}


render(<App/>,window.document.getElementById("app"));
