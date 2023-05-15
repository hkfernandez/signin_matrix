const router = require("express").Router();
const pagesController = require("../controller/pages_controller");

router.route("/homePage").get(pagesController.getHomePage);
router.route("/pillsPage").get(pagesController.getPillsPage);
router.route("/quotesPage").get(pagesController.getQuotesPage);

module.exports = router;
