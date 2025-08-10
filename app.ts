import express from "express";
// const { request, response } = req;
import logger from "morgan";
import cors from "cors";
import contactsRouter from "./routes/api/contacts-router.ts";
import "dotenv/config"; //! скорочений запис
import authRouter from "./routes/api/auth-contacts-router.ts";
import swaggerDocs from "./utils/swagger.ts";

export const app = express(); //* web-server

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/users", authRouter);
swaggerDocs(app, "3000");

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Internal Server Error ❌" } = err;
  res.status(status).json({ message });
});
