const redis = require('redis');

module.exports = class RedisReader {
    constructor(host, port) {
        this.connected = false;

        console.log(`Connecting to redis on ${host}:${port}`);
        this.client = redis.createClient(port, host);

        this.client.on("error", err => {
            console.error(`redis connection error: ${err.message}`);
            this.error = true;
        })

        this.client.on("ready", () => {
            this.connected = true;
        });
    }

    get(key) {
        if (this.error) { throw new Error('Can\'t use redis client in an errored state'); }

        return new Promise((resolve, reject) => {
            this.client.get(key, (err, value) => {
                if (err) {
                    return reject(err);
                }

                resolve(value);
            });
        });
    }

    mget(keys) {
        if (this.error) { throw new Error('Can\'t use redis client in an errored state'); }

        return new Promise((resolve, reject) => {
            this.client.mget(keys, (err, value) => {
                if (err) {
                    return reject(err);
                }

                resolve(value);
            });
        });
    }

    async getColors() {
        const list = JSON.parse(await this.get('color_list'));
        if (!Array.isArray(list)) {
            return {};
        }

        const values = await this.mget(list.sort());

        const result = {};
        for (let i = 0; i < list.length; i++) {
            result[list[i]] = JSON.parse(values[i]);
        }

        return result;
    }
}