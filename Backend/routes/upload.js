import express from "express";
import multer from "multer";
import fs from "fs";
import { summarizeText } from "../utils/summarize.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;
    const text = fs.readFileSync(filePath, "utf-8");

    const summary = await summarizeText(text);

    res.json(summary);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
