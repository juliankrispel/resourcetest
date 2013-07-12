var resource = require('resource'),
    io = require('socket.io-client'),
    q = require('q'),
    client;


require('./reactive.js');
resource.use('socket');
resource.use('hook');
resource.use('http');
resource.use('creature');

resource.http.listen(function(err, server){
    if(err) throw(err);

    resource.socket.start(function(err, socket){
        if(err) throw(err);

        resource.reactive.subscribe({
            resources: ['creature'],
            events: ['create']
        }, function(err){

            if (err) throw(err);

            client = io.connect('http://localhost:8888');
            client.on('connect', function(){

                console.log('client connected');
                setTimeout(function(){
                client.emit('creature', 'create', { id: 'korben', type: 'unicorn' }, function (err, result) {
                });
                
                }, 1000)
            });
        });
    });
});
