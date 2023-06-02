const router = require("express").Router();

const pagesRoutes = require("./pages_routes");
const authRoutes = require("./auth_routes");
const quotesRoutes = require("./quotes_routes");
const indexController = require("../controller/index_controller");

router.route("/*").get(indexController.getSinglePageApp);

module.exports = [pagesRoutes, authRoutes, quotesRoutes, router];
