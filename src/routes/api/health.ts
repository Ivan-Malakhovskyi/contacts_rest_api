import express from "express";

const healthRouter = express.Router();

healthRouter.get("/", (req, res) => {
  res.status(200).json({ test: "Success 🤝" });
});

export default healthRouter;
