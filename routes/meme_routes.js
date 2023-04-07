const router = require("express").Router();
const memesController = require("../controller/memes_controller");

router
  .route("/memes")
  .get(memesController.findAll)
  .post(memesController.addMeme);

module.exports = router;
