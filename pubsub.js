const redis = require('redis');

const CHANNELS = {
    TEST: 'TEST'
};

class PubSub {
    constructor() {
        this.publisher = redis.createClient();
        this.subscriber = redis.createClient();
        
        this.subscriber.subscribe(CHANNELS.TEST);

        this.subscriber.on('message', (channel, message) =>{
                this.handleMessage(channel, message);
        })
    }

    handleMessage(channel, message) {
            console.log(`Message recieved. Channel: ${channel}. 
            Message: ${message}`);
    };
}

const testPubSub = new PubSub();

setTimeout(()=> testPubSub.publisher.publish(CHANNELS.TEST, 'Hello World!'), 1000);