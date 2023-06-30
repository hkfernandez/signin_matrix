import express from "express";
const router = express.Router();
import { quotesController } from "../client/controllers/quotes_controller.js";

router
  .route("/")
  .get(quotesController.getAllQuotes)
  .post(quotesController.addQuote);

export const quotesApiRouter = router;
