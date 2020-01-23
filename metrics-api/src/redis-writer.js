const redis = require('redis');

module.exports = class RedisWriter {
    constructor(host, port) {
        console.log(`Connecting to redis on ${host}:${port}`);
        this.client = redis.createClient(port, host);

        this.client.on("error", err => {
            console.error(`redis connection error: ${err.message}`);
            this.error = true;
        })
    }

    set(key, value) {
        if (this.error) { throw new Error('Can\'t use redis client in an errored state'); }

        this.client.set(key, value);
    }
}