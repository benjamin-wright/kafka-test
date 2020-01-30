const Koa = require('koa');
const Router = require('koa-router');
const RedisReader = require('./redis-reader');
const package = require('../package.json');

const app = new Koa();
const router = new Router();

const redisHost = process.env['REDIS_HOST'] || 'redis';
const redisPort = process.env['REDIS_PORT'] || 6379;

const reader = new RedisReader(redisHost, redisPort);

router.get('/status', (ctx, next) => {
  const status = {
    redis: reader.connected ? 'connected' : (reader.error ? 'error': 'connecting'),
    version: package.version
  }

  ctx.body = status;
});

router.get('/colors', async (ctx, next) => {
  if (!reader.connected) {
    ctx.status = 503;
    ctx.body = { message: "Redis connection not established" };
  }

  const colors = await reader.getColors();
  const total = Object.keys(colors).map(color => colors[color]).reduce((sum, value) => sum + value, 0);

  ctx.body = {
    colors,
    total
  }
});

const logEntry = async (ctx, next) => {
  await next();
  console.info(`${ctx.method}: ${ctx.url} [${ctx.status}]`);
}

app
  .use(logEntry)
  .use(router.routes())
  .use(router.allowedMethods());

const server = app.listen(80, '0.0.0.0');

function cleanup() {
  server.close();
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);