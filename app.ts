import express, {
  Application,
  Request,
  Response,
  json,
  urlencoded,
} from "express";
import { SERVER } from "./constants/env.constant";
import router from "./apis";
import logger from "./configs/logger.config";
import errorMiddleware from "./middlewares/error.middleware";
import cors from "cors";
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output");
const app: Application = express();
const port = SERVER.PORT;
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());
app.use("/api", router);
app.use("/api", errorMiddleware);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.listen(port, async () => {
  try {
    logger.info(`server open`);
  } catch (err) {
    throw err;
  }
});
