const redis = require('redis');

module.exports = class RedisReader {
    constructor(host, port) {
        this.connected = false;

        console.log(`Connecting to redis on ${host}:${port}`);
        this.client = redis.createClient(port, host);

        this.client.on("error", err => {
            console.error(`redis connection error: ${err.message}`);
            process.exit(1);
        })

        this.client.on("ready", () => {
            console.error(`redis connected`);
            this.connected = true;
        });
    }

    get(key) {
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