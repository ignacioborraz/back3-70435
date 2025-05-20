import "./src/helpers/env.js";
import express from "express";
import cookieParser from "cookie-parser";
import compression from "express-compression";
import cluster from "cluster";
import { cpus } from "os";
import { serve, setup } from "swagger-ui-express";
import swaggerSpecs from "./src/helpers/swagger.helper.js";
import dbConnect from "./src/helpers/dbConnect.helper.js";
import indexRouter from "./src/routers/index.router.js";
import winston from "./src/middlewares/winston.mid.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import argvs from "./src/helpers/arguments.helper.js";
import logger from "./src/helpers/logger.helper.js";

/* server settings */
const server = express();
const port = process.env.PORT || 9000;
const ready = async () => {
  // a partir de ahora REGISTRO LOGS unicamente con winston!!!
  //console.log("server ready on port " + port + " and mode " + argvs.mode);
  logger.INFO("server ready on port " + port + " and mode " + argvs.mode);
  logger.INFO("server ready on pid " + process.pid);
  await dbConnect(process.env.LINK_DB);
};
const isPrimary = cluster.isPrimary;
if (isPrimary) {
  /* si estoy en un proceso primario (primary) voy a crear los hijos (workers) */
  const numberOfProcess = cpus().length;
  for (let index = 1; index <= numberOfProcess; index++) {
    cluster.fork();
  }
} else {
  /* si estoy en un worker voy a levantar un servidor, "PRENDIENDO" un nodo del cluster */
  server.listen(port, ready);
}

/* middlewares settings */
server.use(compression({ brotli: { enabled: true, zlib: {} } }));
server.use(cookieParser());
server.use(express.json());
server.use(winston);
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use("/api/docs", serve, setup(swaggerSpecs));

/* router settings */
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);

//console.log(process.argv);
