exports.validateProductQuery = (req, res, next) => {
  const { page, limit, name } = req.query;

  if (page && (!Number.isInteger(+page) || +page <= 0)) {
    return res.status(400).json({ message: "Invalid page number" });
  }

  if (limit && (!Number.isInteger(+limit) || +limit <= 0 || +limit > 100)) {
    return res.status(400).json({ message: "Invalid limit value" });
  }

  if (name && typeof name !== "string") {
    return res.status(400).json({ message: "Invalid name filter" });
  }

  next();
};
