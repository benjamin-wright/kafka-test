const redis = require('redis');

module.exports = class RedisWriter {
    constructor(host, port) {
        console.log(`Connecting to redis on ${host}:${port}`);
        this.client = redis.createClient(port, host);

        this.client.on("error", err => {
            console.error(`redis connection error: ${err.message}`);
            process.exit(1);
        })
    }

    set(key, value) {
        this.client.set(key, value);
    }
}