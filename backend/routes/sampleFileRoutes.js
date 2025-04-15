// routes/sampleFileRoutes.js
import express from "express";
import path from "path";
import fs from "fs";

const router = express.Router();

const sampleFileFolder = path.join(process.cwd(), "sample_excel_file");

// Route: Check & Serve File if it exists
router.get("/:fileName", (req, res) => {
  const { fileName } = req.params;
  const filePath = path.join(sampleFileFolder, fileName);

  if (fs.existsSync(filePath)) {
    res.download(filePath, fileName); // Triggers download
  } else {
    res.status(404).json({ error: "File not found" });
  }
});

export default router;
