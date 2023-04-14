const router = require("express").Router();
const quotesController = require("../controller/quotes_controller");

router
  .route("/quotes")
  .get(quotesController.findAll)
  .post(quotesController.addQuote);

module.exports = router;
