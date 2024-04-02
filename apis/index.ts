import { Router } from "express";
import user from "./user/index";
import auth from "./auth/index";
import question from "./question/index";
import cardNews from "./card-news/index";
import article from "./article/index";
const router: Router = Router();

router.use("/user", user);
router.use("/auth", auth);
router.use("/question", question);
router.use("/card-news", cardNews);
router.use("/article", article);

export default router;
