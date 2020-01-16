const kafka = require('kafka-node');

const host = process.env['KAFKA_HOST'] || 'kafka';
const port = process.env['KAFKA_PORT'] || 9092
const messageInterval = process.env['SUBMIT_INTERVAL'] || 3000;

console.info(`Connecting to Kafka at ${host}:${port}`);

const client = new kafka.KafkaClient({kafkaHost: `${host}:${port}`});
const producer = new kafka.HighLevelProducer(client);

let index = 0;

const interval = setInterval(
  () => {
    index += 1;
    producer.send(
      [{
        topic: 'colors.raw',
        messages: [ `message ${index}`],
        timestamp: Date.now()
      }],
      (err, data) => {
        if (err) { console.error(err); }
        if (data) { console.log(data); }
      }
    );
  },
  messageInterval
);

function cleanup() {
  clearInterval(interval);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);