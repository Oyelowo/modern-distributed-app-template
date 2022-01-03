import { createServer } from "http";
import { parse } from "url";
import next from "next";
import nextConfig from "../next.config";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, conf: nextConfig });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  }).listen(port);

  // tslint:disable-next-line:no-console
  console.log(
    `> Server llistening at http://localhost:${port} as ${
      dev ? "development" : process.env.NODE_ENV
    }`
  );
});

/* 
///<reference path="../@types/index.d.ts"/>

import express from "express";
import next from "next";

// Rest of the imports (I removed to make the code shorter here)

import api from "./api";

const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;

require("dotenv").config();

app
  .prepare()
  .then(() => {
    const server = express();

    // All these following middlewares are imported previously
    server.use(logger("dev"));
    server.use(cors());
    server.use(compression());
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));
    server.use(cookieParser());
    server.use(NoCache);

    server.use("/api", auth.userHeader(), API); // My routes

    server.get("*", (req, res, next) => handle(req, res)); // NextJs Handle

    server.use(ErrorHandler);

    server.listen(port, () => {
      console.log(`Server Listening to port ${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });

export default app;
*/
