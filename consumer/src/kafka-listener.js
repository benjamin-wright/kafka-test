const kafka = require('kafka-node');

module.exports = class Kafka {
  host = null;
  port = null;
  topics = [];
  listeners = {}
  consumer = null;
  started = false;

  constructor(host, port) {
    this.host = host;
    this.port = port;
  }

  addTopic(topic, listener) {
    if (this.started) { throw new Error('Can\'t add topics to a running listener'); }
    if (this.topics.includes(topic)) { throw new Error(`Topic ${topic} is already subscribed`); }

    this.topics.push(topic);
    this.listeners[topic] = listener;

    return this;
  }

  start() {
    if (this.started) { throw new Error('Already started'); }
    console.info(`Connecting to Kafka at ${this.host}:${this.port}`);

    this.started = true;
    this.consumerGroup = new kafka.ConsumerGroup({
      kafkaHost: `${this.host}:${this.port}`,
      groupId: 'consumer',
      fromOffset: "earliest"
    }, this.topics);

    this.consumerGroup.on('message', (message) => {
      const listener = this.listeners[message.topic];
      if (!listener) { throw new Error(`No listener for ${message.topic}`); }

      listener(message.key, message.value);
    })
  }

  stop(callback) {
    if (!this.started) { throw new Error('Already stopped'); }

    this.started = false;
    this.consumerGroup.close(callback);
  }
}