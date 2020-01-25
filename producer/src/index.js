const kafka = require('kafka-node');
const faker = require('faker');

const host = process.env['KAFKA_HOST'] || 'kafka';
const port = process.env['KAFKA_PORT'] || 9092
const messageInterval = process.env['SUBMIT_INTERVAL'] || 250;

console.info(`Connecting to Kafka at ${host}:${port}`);

const client = new kafka.KafkaClient({kafkaHost: `${host}:${port}`});
const producer = new kafka.HighLevelProducer(client);
let ready = false;
producer.on('ready', () => ready = true);

let index = 0;

const interval = setInterval(
  () => {
    if (!ready) {
      return;
    }

    index += 1;
    producer.send(
      [{
        topic: 'colors.raw',
        key: faker.commerce.color(),
        messages: [ `message ${index}` ],
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