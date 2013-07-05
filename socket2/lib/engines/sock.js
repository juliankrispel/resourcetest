var engine = exports;

engine.createServer = function (resources, options, callback) {

  var sockjs = require('sockjs').createServer()
  sockjs.installHandlers(options.server);
  callback(null, io);

  sockjs.on('connection', function (socket) {
    Object.keys(resources).forEach(function(name) {
      var resource = resources[name];
      //
      // For every resource, create a new sock.js handler
      //
      //
      // Remark: Delegate the resource action to the appropiate engine method
      //
      socket.on('data', function(message){
        //
        // Since SockJs just sends plain strings. we need to pass JSON to conform with the socket resource interface
        //
        try {
          message = JSON.parse(str);
        } catch (er) {
          return callback(new Error(message + ' is not valid JSON'));
        }

        //
        // Resource methods
        //
        if(typeof resource[action] === 'function') {
          return engine.request(message[0], message[1], message[2], message[3]);
        }

        return callback(new Error(action + ' is not a valid action.'));

      });
    });
    socket.on('disconnect', function () { 
      // console.log('got a disconnect');
    });
  });
  return io;
};

engine.request = function(resource, action, payload, callback) {
  if (!callback && typeof payload == 'function') {
    callback = payload;
    payload = null;
  }

  if (payload) {
    resource[action](payload, callback);
  }
  else {
    resource[action](callback);
  }  
}

