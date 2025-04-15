// backend/routes/excelRoute.js
import express from "express";
import path from "path";
import fs from "fs";

const router = express.Router();

// Serve a sample file
router.get("/sample/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.resolve("sample_excel_file", fileName);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: "File not found" });
  }
});

// New download route: finds file by matching name (ignoring extension)
router.get("/download", (req, res) => {
  const { fileName } = req.query;
  if (!fileName) {
    return res.status(400).json({ error: "Missing fileName query parameter." });
  }

  // Resolve folder path (assumes "sample_excel_file" is in the project root)
  const folderPath = path.resolve("sample_excel_file");

  // Read all files in the folder
  let files;
  try {
    files = fs.readdirSync(folderPath);
  } catch (error) {
    console.error("Error reading directory:", error);
    return res.status(500).json({ error: "Unable to read directory" });
  }

  // Find a file whose name (without its extension) matches fileName (case-insensitive)
  const match = files.find((file) => {
    const fileNameWithoutExt = path.parse(file).name.toLowerCase();
    return fileNameWithoutExt === fileName.toLowerCase();
  });

  if (!match) {
    return res.status(404).json({ error: "File not found" });
  }

  // Build the absolute path to the matching file and send it as a download
  const filePath = path.join(folderPath, match);
  return res.download(filePath, match, (err) => {
    if (err) {
      console.error("Error downloading file:", err);
      return res.status(500).json({ error: "Error downloading file" });
    }
  });
});

// List all files in sample_excel_file folder (only Excel files)
router.get("/", (req, res) => {
  const dirPath = path.resolve("sample_excel_file");
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Unable to list files" });
    }
    const excelFiles = files.filter(
      (file) => file.endsWith(".xlsx") || file.endsWith(".xls")
    );
    res.json({ success: true, files: excelFiles });
  });
});

// DELETE route for a specific file
router.delete("/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.resolve("sample_excel_file", fileName);

  fs.unlink(filePath, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Error deleting file" });
    }
    res.json({ success: true, message: "File deleted successfully" });
  });
});

export default router;
