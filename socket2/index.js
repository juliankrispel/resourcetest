var resource  = require('resource'),
    socket = resource.define('socket2');

socket.schema.description = "websockets resource";

socket.method('start', start, {
  "description": "starts a websocket server",
  "properties": {
    "options": {
      "description": "Options to configure socket resource",
      "type": "object",
      "properties": {
        "engine": "string"
      }
    },
    "callback": {
      "description": "the callback executed after server listen",
      "type": "function",
      "required": false
    }
  }
});

//
// Available websocket engines
// see: /lib/engines/ for more
exports.engines = {
  "socket.io": require('./lib/engines/socketio'),
  "sock.js": require('./lib/engines/sock.js')
};

function start (options, callback) {
console.log('options', options);

  if (!callback && typeof options == 'function') {
    callback = options;
    options = {};
  }

  var sockets = require('./lib/sockets');
  socket.server = sockets.createServer(
    resource.resources,
    { server: resource.http.server },
    function (err, io) {
      if (err) {
        return callback(err);
      }
      socket.io = io;
      callback(err, io);
    }
  );
}

socket.dependencies = {
  "socket.io": "0.9.x",
  "sockjs": "0.3.x"
};

exports.socket = socket;
