
const kafka = require("../config/kafka");
const { PRODUCT_EVENTS, PRODUCT_EVENTS_DLQ } = require("./topics");
const productService = require("../services/product.service");
const logger = require("../config/logger");

const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID });
const producer = kafka.producer();

const wait = (ms) => new Promise(res => setTimeout(res, ms));

exports.startConsumer = async () => {
  let connected = false;

  while (!connected) {
    try {
      logger.info("Trying to connect to Kafka...");
      await consumer.connect();
      await producer.connect();
      connected = true;
      logger.info("Connected to Kafka");
    } catch (err) {
      logger.warn("Kafka not ready, retrying in 5s...");
      await wait(5000);
    }
  }

  await consumer.subscribe({ topic: PRODUCT_EVENTS });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const event = JSON.parse(message.value.toString());
        await productService.processEvent(event);
        logger.info(`Processed product ${event.id}`);
      } catch (err) {
        logger.error("Processing failed, sending to DLQ");
        await producer.send({
          topic: PRODUCT_EVENTS_DLQ,
          messages: [{ value: message.value }]
        });
      }
    }
  });
};
