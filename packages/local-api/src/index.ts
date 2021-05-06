import express from "express";
import path from "path";
import { createProxyMiddleware } from "http-proxy-middleware";
import { createCellsRouter } from "./routes/cells";

export const serve = (port: number, filename: string, dir: string, useProxy: boolean) => {
  const app = express();
  app.use(createCellsRouter(filename, dir));
  if (useProxy) {
    // we want it for development purposes
    app.use(createProxyMiddleware({ target: "http://localhost:3000", ws: true, logLevel: "silent" }));
  } else {
    const packagePath = require.resolve("local-client/build/index.html"); // resolve tells where the real build folder is, because in node_modules there's only a symbolic link
    app.use(express.static(path.dirname(packagePath)));
  }

  return new Promise<void>((resolve, reject) => app.listen(port, resolve).on("error", reject));
};
