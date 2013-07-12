var resource = require('resource'),
    hook = resource.use('hook'),
    reactive = resource.define('reactive');

reactive.schema.description = "for automatically publishing resource events to sockets";

reactive.method('subscribe', subscribe, {
    "description": "subscribe to all events",
    "options": {
        "properties": {
            "resources": { "type": "array", "required": "true" },
            "events": { "type": "array", "required": "true" }
        }
    }
});

function subscribe(options, callback){
    options.resources.forEach(function(name){
        if(!resource[name]) throw('there is no resource with this name: ' + name);
        options.events.forEach(function(event){
            hook.create({
                if: name + '::' + event,
                then: 'socket::send',
                with: {
                    from: 'hello',
                    subject: 'whatever'
                }
            });
        });
    });
    setTimeout(function(){
        hook.start(callback);
    
    }, 500)
}

return reactive;
