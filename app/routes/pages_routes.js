const router = require("express").Router();
const pagesController = require("../controller/pages_controller");

router.route("/quotes").get(pagesController.getQuotesPage);
router.route("/pills").get(pagesController.getPillsPage);

module.exports = router;
