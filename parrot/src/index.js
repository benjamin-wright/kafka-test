const kafka = require('kafka-node');

const host = process.env['KAFKA_HOST'] || 'kafka';
const port = process.env['KAFKA_PORT'] || 9092

console.info(`Connecting to Kafka at ${host}:${port}`);

const payload = {
    topic: ''
}

const consumerGroup = new kafka.ConsumerGroup({
    kafkaHost: `${host}:${port}`,
    groupId: 'parrot',
    fromOffset: 'earliest'
}, [ 'colors.raw', 'colors.processed' ]);

consumerGroup.on('message', message => {
    console.log(message);
});

function cleanup() {
  consumerGroup.close(() => {});
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);