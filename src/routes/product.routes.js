const router = require("express").Router();
const controller = require("../controllers/product.controller");
const { validateProductQuery } = require("../middlewares/validation.middleware");

router.get("/", validateProductQuery, controller.getProducts);
router.get("/:id", controller.getProduct);

module.exports = router;
