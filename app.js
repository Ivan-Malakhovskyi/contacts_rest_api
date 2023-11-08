import express from "express";
import logger from "morgan";
import { contactsRouter } from "./routes/api/contacts.js";
import cors from "cors";
import { listContacts } from "./models/contacts.js";

// const express = require("express");

// const logger = require("morgan");
// const cors = require("cors");

// const contactsRouter = require("./routes/api/contacts");

export const app = express(); //* web-server

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use("/api/contacts", contactsRouter); //* moiddleware

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

// router.get("/api/contacts", (req, res) => {
//   listContacts();
//   res.status(200).json();
// });

//* =========================================================

app.get("/contacts", (req, res) => {
  res.json(listContacts);
  // res.send(`<h1>Contact</h1> Параметр: ${req.params.id}`);
});

// app.use(express.urlencoded({ extended: false }));

// app.post("/login", (req, res, next) => {
//   const { email, password } = req.body;
// });

app.use(express.json());

// module.exports = app;
