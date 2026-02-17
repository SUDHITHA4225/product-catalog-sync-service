const productModel = require("../models/product.model");

exports.processEvent = async (event) => {
  if (!event.id) throw new Error("Invalid event");
  await productModel.upsert(event);
};
