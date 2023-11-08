// const app = require("./app");

import { app } from "./app.js";

// app.listen(3000, () =>
//   console.log("Server running. Use our API on port: 3000")
// );

//* ==============================================

app.use((req, res, next) => {
  next();
}); //* middleware для кожного запиту

//! Використання middleware
// ? CORS

// app.get("/", (req, res) => {
//   res.send("<h1>This is Main PAge</h1>");
// });

// app.get("/contacts", (req, res) => {
//   console.log(req.url);
//   console.log(req.method);
//   res.send("This is contacts Page");
// });

app.listen(3000, () =>
  console.log("Server running. Use our API on port: 3000")
);
