# It's easy to share your demo now!


## Install
```sh
npm install demoshare
```

## Usage

Just add one line!

### Express

```js
var app = require('express')()
var server = require('http').Server(app)

require('demoshare')(server)
```

### Koa

```js
var app = require('koa')()

require('demoshare')(app.listen(3000))
```

### You can connect `demoshare` with any instance of HttpServer!
For example, socket.io:

```js
var server = require('http').Server()
var io = require('socket.io')(server)

require('demoshare')(http)
```


