import { Router } from "express";
import { validateAuth } from "../middlewares/validateAuth.middleware.js";
import { getModels, getModelById } from "../controllers/model.controller.js";

const modelRouter = Router();

modelRouter.get("/", validateAuth, getModels);
modelRouter.get("/model/:id", validateAuth, getModelById);

export default modelRouter;