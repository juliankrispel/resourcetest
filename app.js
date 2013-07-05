var resource = require('resource'),
    io = require('socket.io-client'),
    q = require('q'),
    client;

require('./socket2/index.js');
resource.use('http');
resource.use('creature');

resource.http.listen(function(err, server){
    if(err) throw(err);
    resource.socket2.start(function(err, socket){
        if(err) throw(err);

        client = io.connect('http://localhost:8888');
        client.on('connect', function(){
            console.log('client connected');
            client.emit('creature', 'create', { id: 'korben', type: 'unicorn' }, function (err, result) {
            });
        });
    });
});


