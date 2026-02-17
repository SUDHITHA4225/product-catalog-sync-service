const model = require("../models/product.model");

// GET /products (paginated + filterable)
exports.getProducts = async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);
  const name = req.query.name;
  const offset = (page - 1) * limit;

  const { totalItems, data } = await model.findAll({
    limit,
    offset,
    name
  });

  const totalPages = Math.ceil(totalItems / limit);

  res.json({
    currentPage: page,
    limit,
    totalItems,
    totalPages,
    data
  });
};

// GET /products/:id
exports.getProduct = async (req, res) => {
  const product = await model.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
};
