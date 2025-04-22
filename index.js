import "./src/helpers/env.js";
import express from "express";
import compression from "express-compression";
import dbConnect from "./src/helpers/dbConnect.helper.js";
import indexRouter from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import argvs from "./src/helpers/arguments.helper.js";

/* server settings */
const server = express();
const port = process.env.PORT || 8080;
const ready = async () => {
  console.log("server ready on port " + port + " and mode " + argvs.mode);
  await dbConnect(process.env.LINK_DB);
};
server.listen(port, ready);

/* middlewares settings */
server.use(compression({ brotli: { enabled: true, zlib: {} } }));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));

/* router settings */
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);

//console.log(process.argv);
