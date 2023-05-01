const router = require("express").Router();
const quotesController = require("../controller/quotes_controller");

router.route("/quotes").get(quotesController.getQuotesPage);

router
  .route("/quotes/api")
  .get(quotesController.getAllQuotes)
  .post(quotesController.addQuote);

router.route("/digitalRain").get(quotesController.getDigitalRainPage);

module.exports = router;
