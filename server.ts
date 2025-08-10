import mongoose from "mongoose";
import { app } from "./app.ts";
import logger from "./utils/logger.ts";

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST!)
  .then(() => {
    console.log("✔ Success conecting");
    app.listen(PORT, () => {
      logger.info(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ ooops...", err.message);
    process.exit(1);
  });

//       "username": "testr",
//     "email": "rakode5197@elobits.com",
// "password": "122edFEfe"
