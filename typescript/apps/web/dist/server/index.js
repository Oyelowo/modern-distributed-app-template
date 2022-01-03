"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const url_1 = require("url");
const next_1 = __importDefault(require("next"));
const next_config_1 = __importDefault(require("../next.config"));
const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = (0, next_1.default)({ dev, conf: next_config_1.default });
const handle = app.getRequestHandler();
app.prepare().then(() => {
    (0, http_1.createServer)((req, res) => {
        const parsedUrl = (0, url_1.parse)(req.url, true);
        handle(req, res, parsedUrl);
    }).listen(port);
    // tslint:disable-next-line:no-console
    console.log(`> Server llistening at http://localhost:${port} as ${dev ? "development" : process.env.NODE_ENV}`);
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
