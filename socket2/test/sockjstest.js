var tap = require("tap"),
    resource = require('resource'),
    io = require('sockjs-client');


  resource.use('http');
  resource.use('creature');
  require('../index.js'); //Instead of including the resource with .use I require it as it isn't an npm module yet.

tap.test('create a socket server with the sockjs engine', function (t) {
  resource.http.listen(function (err, server) {
    t.error(err, 'http resource listened');
    resource.socket.start({engine: 'sock.js'}, function (err) {
      t.error(err, 'socket resource listened');
      t.end();
    });
  });
});

var client;
tap.test('connect to socket server', function (t) {
  t.doesNotThrow(function () {
    client = io.create('http://localhost:8888');
  }, 'client created successfully');

  t.type(client, 'object', 'client is defined');

  client.on('connection', function () {
    t.pass('client connected');
    t.end()
  });
});

tap.test('create a creature', function (t) {
  t.doesNotThrow(function(){
    var json = JSON.stringify(['creature', 'create', { id: 'korben' }]);
    client.write(json);
  });

  resource.creature.on('create', function(){
    t.pass('creature created');
    t.end();
  });
});

//tap.test('get created creature', function (t) {
//  client.emit('creature', 'get', 'korben', function (err, result) {
//    t.error(err, 'no error');
//    t.type(result, 'object', 'creature is an object');
//    t.equal(result.id, 'korben', 'id is korben');
//    t.end();
//  });
//});
//
//tap.test('all creatures', function (t) {
//  client.emit('creature', 'all', function (err, result) {
//    t.error(err, 'no error');
//    t.type(result, Array, 'result is an array');
//    t.equal(result.length, 1);
//    t.end();
//  });
//});
//
//tap.test('update creature', function (t) {
//  client.emit('creature', 'update', { id: 'korben', type: 'unicorn' }, function (err, result) {
//    t.error(err, 'no error');
//    t.type(result, 'object', 'creature is an object');
//    t.doesNotThrow(function () {
//      t.equal(result.id, 'korben', 'id is korben');
//      t.equal(result.type, 'unicorn', 'type is unicorn');
//    });
//    t.end();
//  });
//});
//
//tap.test('destroy creature', function (t) {
//  client.emit('creature', 'destroy', 'korben', function (err) {
//    t.error(err, 'no error');
//    t.end();
//  });
//});
//
//tap.test('try to get destroyed creature', function (t) {
//  client.emit('creature', 'get', 'korben', function (err, result) {
//    t.type(err, 'object', 'returns an object representing an error');
//    t.end();
//  });
//});
//
//tap.test("stop everything", function (t) {
//
//  t.plan(2);
//
//  client.on('disconnect', function () {
//    t.pass('client disconnected');
//  });
//  client.disconnect();
//
//  resource.http.server.close(function () {
//    t.pass('server disconnected');
//  });
//});

