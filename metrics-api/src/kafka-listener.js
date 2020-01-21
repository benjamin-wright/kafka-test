const kafka = require('kafka-node');

const host = process.env['KAFKA_HOST'] || 'kafka';
const port = process.env['KAFKA_PORT'] || 9092

const listTopic = process.env['COLOR_LIST_TOPIC'] || 'colors.list'
const dataTopic = process.env['COLOR_DATA_TOPIC'] || 'colors.processed'

console.info(`Connecting to Kafka at ${host}:${port}`);

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