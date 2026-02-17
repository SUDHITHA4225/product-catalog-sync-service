const service = require("../../services/product.service");

test("invalid event throws error", async () => {
  await expect(service.processEvent({})).rejects.toThrow();
});
