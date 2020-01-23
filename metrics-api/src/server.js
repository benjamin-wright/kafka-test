const Koa = require('koa');
const Router = require('koa-router');
const KafkaListener = require('./kafka-listener');
const RedisWriter = require('./redis-writer');

const app = new Koa();
const router = new Router();

const kafkaHost = process.env['KAFKA_HOST'] || 'kafka';
const kafkaPort = process.env['KAFKA_PORT'] || 9092;
const redisHost = process.env['REDIS_HOST'] || 'redis';
const redisPort = process.env['REDIS_PORT'] || 6379;

const listener = new KafkaListener(kafkaHost, kafkaPort);
const writer = new RedisWriter(redisHost, redisPort);

listener.addTopic('colors.processed', (key, value) => {
  console.log(key, value);
  writer.set(key, value);
});
listener.addTopic('colors.list', (key, value) => {
  console.log(key, value);
  writer.set(key, value);
});

listener.start();

router.get('/', (ctx, next) => {
  // ctx.router available
});

app
  .use(router.routes())
  .use(router.allowedMethods());

const server = app.listen(80, '0.0.0.0');

function cleanup() {
  listener.stop(() => {});
  server.close();
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);