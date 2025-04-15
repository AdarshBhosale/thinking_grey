import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// For __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SAMPLE_FOLDER_PATH = path.join(__dirname, "../sample_excel_file");

router.get("/get-sample-excel/:filename", (req, res) => {
  const { filename } = req.params;

  const safeName = filename.replace(/[^a-z0-9_\-\.]/gi, "").toLowerCase();
  const filePath = path.join(SAMPLE_FOLDER_PATH, safeName);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: "Sample file not found" });
    }
    return res.json({ url: `/sample_excel_file/${safeName}` });
  });
});

export default router; // ✅ ESM export
