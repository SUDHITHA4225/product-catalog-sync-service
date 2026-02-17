require("dotenv").config();
const app = require("./app");
const { startConsumer } = require("./kafka/consumer");

app.listen(process.env.PORT, async () => {
  console.log("Service started");
  await startConsumer();
});
