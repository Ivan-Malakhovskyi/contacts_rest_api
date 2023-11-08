import express from "express";

// const express = require("express");

export const contactsRouter = express.Router();

contactsRouter.get("/", async (req, res, next) => {
  res.json({ message: "test message" });
});

contactsRouter.get("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

contactsRouter.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

contactsRouter.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

contactsRouter.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

// module.exports = router;
