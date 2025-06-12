import "dotenv/config.js";
// ver la clase de entornos para realizar la implementación de entornos dev, test, prod"
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dbConnect from "./src/helpers/dbConnect.helper.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import router from "./src/routers/index.router.js";
import swaggerSpec from "./src/helpers/swagger.helper.js";
import { serve, setup } from "swagger-ui-express";

/* server */
const server = express();
const port = process.env.PORT;
const ready = async () => {
  console.log("server ready on port " + port);
  // ver la clase de logger para realizar la implementacion con winston
  await dbConnect(process.env.LINK_DB);
};
server.listen(port, ready);

/* middlewares */
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(morgan("dev"))
server.use("/api/docs", serve, setup(swaggerSpec))

/* router */
server.use("/", router);
server.use(errorHandler);
//ver la clase de errores e implementar con diccionario
