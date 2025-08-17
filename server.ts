import mongoose from "mongoose";
import { app } from "./app.ts";
import { log } from "./utils/logger.ts";
import { wakeUp } from "./utils/wake-up.ts";

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST!)
  .then(() => {
    wakeUp();
    console.log("✔ Success conecting");

    app.listen(PORT, () => {
      log.info(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ ooops...", err.message);
    process.exit(1);
  });
