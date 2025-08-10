// import { Request, Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
// import v from "../package.json" with {type: 'json'};
import swaggerUi from "swagger-ui-express";
import type { Express } from "express";
import log from "./logger.ts";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const options = require("../swagger.json");
console.log(options);

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

// "items": {
//           "type": "object",
//           "properties": {
//             "name": {
//               "type": "string",
//               "description": "Contact`s name"
//             },
//             "email": {
//               "type": "string",
//               "description": "Contact`s email"
//             },
//             "phone": {
//               "type": "string",
//               "description": "Contact`s phone"
//             },
//             "favorite": {
//               "type": "boolean"
//             },
//             "avatar": {
//               "type": "string",
//               "description": "Contact`s avatar"
//             },
//             "owner": {
//               "type": "string",
//               "description": "Contact`s owner"
//             },
//             "_id": {
//               "type": "string",
//               "description": "Contact`s _id"
//             },
//             "createdAt": {
//               "type": "string",
//               "format": "date",
//               "description": "createdAt"
//             },
//             "updatedAt": {
//               "type": "string",
//               "format": "date",
//               "description": "updatedAt"
//             }
//           }
//         }
