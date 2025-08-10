// import { Request, Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
// import v from "../package.json" with {type: 'json'};
import swaggerUi from "swagger-ui-express";
import type { Express } from "express";
import log from "./logger.ts";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const options = require("../swagger.json");

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app: Express, port: string | 3000) {
  //* swagger page
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  //*Docs in json format
  app.get("/api-docs/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  log.info(`Docs available at http://localhost:${port}/api-docs`);
}

export default swaggerDocs;
