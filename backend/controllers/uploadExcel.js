import multer from "multer";
import path from "path";
import fs from "fs";
import XLSX from "xlsx";
import productModel from "../models/productModel.js";

// Determine the correct upload folder based on environment
// In production (e.g. Vercel), use /tmp because the bundle is read-only
const isProduction = process.env.NODE_ENV === "production";
const folderName = isProduction ? "/tmp/sample_excel_file" : "sample_excel_file";
const uploadPath = path.resolve(folderName);

// ✅ Ensure the folder exists (creates /tmp/sample_excel_file in production)
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// ✅ Multer setup to save Excel file with its original name
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage }).single("excelFile");

// ✅ Route 1: Upload file only
export const uploadExcelFile = (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      console.error("Multer error:", err);
      return res
        .status(500)
        .json({ success: false, message: "Upload failed", error: err.message });
    }
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }
    return res.json({
      success: true,
      message: "Excel file uploaded successfully",
      filename: req.file.originalname,
    });
  });
};

// ✅ Route 2: Read & insert Excel data into MongoDB
export const uploadExcelProducts = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const filePath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();

    if (![".xls", ".xlsx"].includes(ext)) {
      fs.unlinkSync(filePath);
      return res
        .status(400)
        .json({ success: false, message: "Unsupported file format" });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    if (!worksheet || !worksheet["!ref"]) {
      fs.unlinkSync(filePath);
      return res
        .status(400)
        .json({ success: false, message: "No data found in Excel sheet" });
    }

    const sheetData = XLSX.utils.sheet_to_json(worksheet);

    if (!sheetData || sheetData.length === 0) {
      fs.unlinkSync(filePath);
      return res
        .status(400)
        .json({ success: false, message: "No rows found in sheet" });
    }

    const formattedData = sheetData.map((item) => ({
      name: item.name || "",
      description: item.description || "",
      price: Number(item.price) || 0,
      category: item.category || "Men",
      subCategory: item.subCategory || "TopWear",
      sizes: item.sizes ? item.sizes.split(",") : [],
      bestseller: item.bestseller === "true",
      image: item.image ? item.image.split(",") : [],
      demo_url: item.demo_url || "",
      date: Date.now(),
      sampleExcelFileName: req.file.originalname, // ✅ Save file name with each product
    }));

    await productModel.insertMany(formattedData);
    fs.unlinkSync(filePath); // Optional: remove file after processing

    res.json({
      success: true,
      message: `${formattedData.length} products inserted successfully from Excel`,
    });
  } catch (error) {
    console.error("Excel upload error:", error);
    if (req.file?.path) fs.unlinkSync(req.file.path);
    res.status(500).json({
      success: false,
      message: "Error processing Excel file",
      error: error.message,
    });
  }
};
