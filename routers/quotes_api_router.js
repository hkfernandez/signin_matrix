import express from "express";
const router = express.Router();
import { quotesController } from "../controllers/quotes_controller.js";

router
  .route("/")
  .get(quotesController.getAllQuotes)
  .post(quotesController.addQuote);

export const quotesApiRouter = router;
