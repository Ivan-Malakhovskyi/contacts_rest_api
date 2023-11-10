import express from "express";
import logger from "morgan";
import cors from "cors";
import contactsRouter from "./routes/api/contacts-router.js";

export const app = express(); //* web-server

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter); //* middleware

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

//* =========================================================

// app.use(express.urlencoded({ extended: false }));

// app.post("/login", (req, res, next) => {
//   const { email, password } = req.body;
// });

// module.exports = app;
