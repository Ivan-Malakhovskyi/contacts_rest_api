import express from "express";
import logger from "morgan";
import cors from "cors";
import "dotenv/config"; //! скорочений запис
import contactsRouter from "./routes/api/contacts-router";
import authRouter from "./routes/api/auth-contacts-router";
import { swaggerDocs } from "./utils/swagger";
import healthRouter from "./routes/api/health";
import { notFound } from "./middlewares/not_found";
import { errorHandler } from "./middlewares/errorHandler";

export const app = express(); //* web-server

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);
app.use("/api/health", healthRouter);
swaggerDocs(app, "3000");

app.use(notFound);

app.use(errorHandler);
