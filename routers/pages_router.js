import express from "express";
const router = express.Router();
import { pagesController } from "../client/controllers/pages_controller.js";

router.route("/about").get(pagesController.getAboutPage);
router.route("/pills").get(pagesController.getPillsPage);
router.route("/quotes").get(pagesController.getQuotesPage);

export const pagesRouter = router;
