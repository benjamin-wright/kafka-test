const Koa = require('koa');
const Router = require('koa-router');
const KafkaListener = require('./kafka-listener');

const app = new Koa();
const router = new Router();

const host = process.env['KAFKA_HOST'] || 'kafka';
const port = process.env['KAFKA_PORT'] || 9092

const listener = new KafkaListener(host, port);
listener.addTopic('colors.processed', (key, value) => console.log(key, value));
listener.addTopic('colors.list', (key, value) => console.log(key, value));
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