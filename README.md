Simple Chat based on ReactJs using SocketIO
=============================

English Instructions:

This project aims to be a plug&play server that all you'll need to do is import the component. and use it.
Let me know if you struggle to install it. Unlike the other Reactjs chat apps this will stand alone and you don't really have to combime with the nodejs back end. In reality you just have to have a javascript socket listening on port 9000.


To install Frontend, go to the Frontend folder and run

```php
npm install
```

This will pull down all the node packages needed.

Then simply just run

```php
npm start.
```

for the back end, you can install the back end using npm install. Afterwards, you can run the server using nodemon.  to run it.

```php
node_modules/nodemon/bin/nodemon.js  index
```


I have added a link to my index.html in my reactjs project to reference the stylesheet. You can of course change this to your liking.  

```php
<link rel="stylesheet" type="text/css" href="./style.css">
```


If you don't want to use our back end here is a simple nodejs server code snippet that will work with this. If the following code doesn't work for you the index.js code should work fine. I keep this hear because I want to have this be easy as possible to install.

```JavaScript
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


io.on('connection', function(socket){
  console.log("connected")

    socket.on('chat message', function(msg){
    socket.broadcast.emit('chat message', msg);
    console.log('message: ' + msg);

  });
});

http.listen(9000, function(){
  console.log('listening on *:9000');
});


```



Things to add:
Emoji use.
Private chat.
User selection in chat.



Russian Instructions:

Данный модуль был написан для общения.
Основные функции:
- авторизация пользователей в системе
- отправка смайлов
- поддержка кирилицы
- эхо сервера


![screenshot of sample](https://image.ibb.co/gr0o3R/Screenshot_2017_11_22_17_12_31.png)

> За основу взят фреймворк,а точнее набор библиотек  ReactJs


Установка
------------
Скачать архив.
Распакавать.
Для запуска нужен NodeJS потому как сервер работает с сокетами.
Запускаете nodeJS+index.js
Стартует сервер который начинает слушать сообщения на 9000 порту,который потом передаёт их в общее окно чата.

Содержание пакета
------------

```php
Название файла        | Содержание файла
----------------------|----------------------
index.js              | Содержит синтаксис для удобства работы с Codeigniter
index.html            | главная страница чата
все остальные файлы   | описание скоро обновится следите за обновлениями.
папки                 | Описание содержимого папок
----------------------|-----------------------
```


Будущие изменения
------------

Когда-то что обновиться и произодйет прорыв который закроет дырки в безопасности,но пока что так.
Stay tuned.
