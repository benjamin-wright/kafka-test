const KafkaListener = require('./kafka-listener');
const RedisWriter = require('./redis-writer');

const kafkaHost = process.env['KAFKA_HOST'] || 'kafka';
const kafkaPort = process.env['KAFKA_PORT'] || 9092;
const redisHost = process.env['REDIS_HOST'] || 'redis';
const redisPort = process.env['REDIS_PORT'] || 6379;

const listener = new KafkaListener(kafkaHost, kafkaPort);
const writer = new RedisWriter(redisHost, redisPort);

listener.addTopic('colors.processed', (key, value) => {
  console.info(`colors.processed: ${key} -> ${value}`);
  writer.set(key, value);
});

listener.addTopic('colors.list', (key, value) => {
  try {
    const items = JSON.parse(value);
    console.info(`colors.list: ${items.length} items`);
  }
  catch {
    console.warn(`Error processing color list payload: ${value}`);
  }

  writer.set(key, value);
});

listener.start();

function cleanup() {
  listener.stop(() => {});
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);