const router = require("express").Router();
router.get("/health", (_, res) => res.sendStatus(200));
module.exports = router;
