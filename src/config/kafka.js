const { Kafka } = require("kafkajs");

module.exports = new Kafka({
  clientId: "product-sync-service",
  brokers: [process.env.KAFKA_BROKER]
});
