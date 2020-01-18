const kafka = require('kafka-node');
const faker = require('faker');

const host = process.env['KAFKA_HOST'] || 'kafka';
const port = process.env['KAFKA_PORT'] || 9092
const messageInterval = process.env['SUBMIT_INTERVAL'] || 10000;

console.info(`Connecting to Kafka at ${host}:${port}`);

const client = new kafka.KafkaClient({kafkaHost: `${host}:${port}`});
const producer = new kafka.HighLevelProducer(client);

let index = 0;

function createMessageBody(i) {
  return JSON.stringify({
    color: faker.commerce.color(),
    index: i
  });
}

const interval = setInterval(
  () => {
    index += 1;
    producer.send(
      [{
        topic: 'colors.raw',
        messages: [ createMessageBody(index) ],
        timestamp: Date.now()
      }],
      (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        const offset = data['colors.raw'][0]

        console.log(`published index ${index}: offset ${offset}`);
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