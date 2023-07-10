import express from "express";
const expressRouter = express.Router();

//import { pagesRouter } from "./pages_router.js";
//import { authApiRouter } from "./auth_api_router.js";
import { quotesApiRouter } from "./quotes_api_router.js";
import { indexController } from "../client/controllers/index_controller.js";

//expressRouter.use("/page", pagesRouter);
//expressRouter.use("/authApi", authApiRouter);
expressRouter.use("/quotesApi", quotesApiRouter);
expressRouter.route("/*").get(indexController.getSinglePageApp);

export const router = expressRouter;
