import express from "express";
const expressRouter = express.Router();

import { quotesApiRouter } from "./quotes_api_router.js";
import { indexController } from "../controllers/index_controller.js";

expressRouter.use("/quotesApi", quotesApiRouter);
expressRouter.route("/*").get(indexController.getSinglePageApp);

export const router = expressRouter;
