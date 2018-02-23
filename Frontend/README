Simple Chat based on ReactJs using SocketIO
=============================


![screenshot of sample](https://image.ibb.co/gvCX8H/chatscreen.png)


### English Instructions:

### Warning My time is becoming limited. If you want improvements, please help me make that happen and donate some of your time to this project.

This project aims to be a plug&play server that all you'll need to do is import the component. and use it.
Let me know if you struggle to install it. Unlike the other Reactjs chat apps this will stand alone and you don't really have to combine with the nodejs back end. In reality you just have to have a javascript socket listening on port 9000.

If you want to help or file a bug report , please check [github](https://github.com/ApertureSecurity/Reactjs-Chat-Component)

####Demo and make test code, git clone this from
```php
https://github.com/ApertureSecurity/Reactjs-Chat-Component
```

and make your changes in the  Reactjs-Chat-Component/Frontend/demo/chatapp.js file.
and run
```php
npm install
npm start
```

The server is located in Reactjs-Chat-Component/index.js
you can just cd to the directory and run
```php
node_modules/nodemon/bin/nodemon.js  index
```


###INSTALL
To install Frontend, go to the Frontend folder and run

```php
npm install
```

This will pull down all the node packages needed.

Then simply just import the component.

```JavaScript
import  Chatapp    from "reactjs-chatapp";
```

for the back end, you can install the back end using npm install. Afterwards, you can run the server using nodemon.  to run it.

```php
node_modules/nodemon/bin/nodemon.js  index
```


I have added a link to my index.html in my reactjs project to reference the stylesheet. You can of course change this to your liking.

```php
<link rel="stylesheet" type="text/css" href="./chat-style.css">
```


If you don't want to use our back end here is a simple nodejs server code snippet that will work with this.
You should be able to simply copy this and paste it into your server app. It listens on port 9000 by default.

(github server link)[https://github.com/ApertureSecurity/Reactjs-Chat-Component/blob/master/index.js]


```JavaScript
<Chatapp authenticated="true" MainRoom="Global Chat"  servername="SlaBot" welcomemessage="Welcome to ChatApp (^=^)" uri="http://localhost:9000"  hardpath="/socket.io" reconnect="true" resource="/" secure="false" />
```


###Known issues:
warnings upon install: This is normal
```php
+-- reactjs-chatapp@1.0.21
| +-- UNMET PEER DEPENDENCY react@^16
| `-- UNMET PEER DEPENDENCY react-dom@^16
`-- UNMET PEER DEPENDENCY socket.io-client@^1.4.5


```

Things to add:
- [x] 1. Emoji use.
- [x] 2. Private chat.
- [x] 3. User selection in chat.
- [x] 4. More styling.
- [x] 5. Make this an NPM module.
- [ ] 6. Check for duplicate user names.
- [ ] 7. Use Cookie based authentication.
