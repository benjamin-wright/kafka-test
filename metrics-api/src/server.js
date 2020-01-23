const Koa = require('koa');
const Router = require('koa-router');
const RedisWriter = require('./redis-writer');

const app = new Koa();
const router = new Router();

const redisHost = process.env['REDIS_HOST'] || 'redis';
const redisPort = process.env['REDIS_PORT'] || 6379;

const writer = new RedisWriter(redisHost, redisPort);

router.get('/', (ctx, next) => {
  // ctx.router available
});

app
  .use(router.routes())
  .use(router.allowedMethods());

const server = app.listen(80, '0.0.0.0');

function cleanup() {
  server.close();
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);