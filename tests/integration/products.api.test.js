const request = require("supertest");
const app = require("../../src/app");

describe.skip("Products API", () => {
  it("GET /products should return paginated products", async () => {
    const res = await request(app).get("/products");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("totalItems");
  });

  it("GET /products/:id should return 404 for invalid id", async () => {
    const res = await request(app).get("/products/invalid-id");

    expect(res.statusCode).toBe(404);
  });
});
