import { Router} from "express";
import authRouter from "./auth.routes.js";
import modelRouter from "./model.routes.js";

const router = Router();

router.use(authRouter);
router.use(modelRouter);

export default router;