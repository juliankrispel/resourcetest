var resource = require('resource'),
    io = require('sockjs-client'),
    q = require('q'),
    client;

require('./socket2/index.js');
resource.use('http');
resource.use('creature');

resource.socket.on('connection', function(a, b){
    console.log(a, b);
});
resource.creature.on('create', function(a, b){
    console.log('event: ' + this.event);
});

resource.http.listen(function(err, server){
    if(err) throw(err);
    resource.socket.start({ engine: 'sock.js' }, function(err, socket){
        if(err) throw(err);

        client = io.create('http://localhost:8888');
        client.on('connection', function(){
            console.log('client connected');
            var obj = ['creature', 'create', { id: 'korben', type: 'unicorn' }];
            client.write(JSON.stringify(obj));
        });
    });
});

