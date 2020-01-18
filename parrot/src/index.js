const kafka = require('kafka-node');

const host = process.env['KAFKA_HOST'] || 'kafka';
const port = process.env['KAFKA_PORT'] || 9092

console.info(`Connecting to Kafka at ${host}:${port}`);

const payload = {
    topic: ''
}

const consumerGroup = new kafka.ConsumerGroup({
    kafkaHost: `${host}:${port}`,
    groupId: 'parrot'
}, [ 'colors.raw', 'colors.processed', 'colors.list' ]);

consumerGroup.on('message', message => {
    console.log(`${message.topic}: ${message.key} = ${message.value}`);
});

function cleanup() {
  consumerGroup.close(() => {});
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);