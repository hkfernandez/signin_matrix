const router = require("express").Router();
const quotesController = require("../controller/quotes_controller");
const pagesController = require("../controller/pages_controller");

router.route("/quotesPage").get(pagesController.getQuotesPage);

router
  .route("/quotes/api")
  .get(quotesController.getAllQuotes)
  .post(quotesController.addQuote);

module.exports = router;
