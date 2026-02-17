const { processProductEvent } = require("../../src/services/product.service");

describe.skip("Product Event Processing", () => {
  it("should process a valid product event", async () => {
    const event = {
      id: "test-p1",
      name: "Test Product",
      description: "Unit test product",
      price: 100
    };

    const result = await processProductEvent(event);
    expect(result).toBeTruthy();
  });

  it("should throw error for invalid event", async () => {
    const badEvent = { name: "Broken", price: "abc" };

    await expect(processProductEvent(badEvent)).rejects.toThrow();
  });
});
