import { app } from "./app.js";
import mongoose from "mongoose";

const { DB_HOST, PORT = 3000 } = process.env; //*Об'єкт procces.env - змінні оточення

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("✔ Success conecting");
    app.listen(PORT, () =>
      console.log(`Server running. Use our API on port: ${PORT}`)
    );
  })
  .catch((err) => {
    console.log("❌ ooops...", err.message);
    process.exit(1); //*закриття всіх запущених процесів
  });
