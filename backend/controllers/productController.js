import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
import XLSX from "xlsx";
import fs from "fs";
import path from "path";

//function for add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
      demo_url,
      sampleExcelFileName,
    } = req.body;

    // Configure Cloudinary (make sure this is at the top of your file)
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET_KEY,
    });

    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const images = [image1, image2, image3, image4].filter(Boolean);

    // Upload images to Cloudinary
    let imagesUrl = [];
    for (const image of images) {
      try {
        const result = await cloudinary.uploader.upload(image.path, {
          folder: "products", // Optional: organize images in Cloudinary
          resource_type: "image",
        });
        imagesUrl.push(result.secure_url);
      } catch (uploadError) {
        console.error(`Error uploading image ${image.originalname}:`, uploadError);
        // Clean up any uploaded files if one fails
        imagesUrl.forEach(url => {
          // You might want to implement a function to delete from Cloudinary
        });
        throw new Error(`Failed to upload image: ${image.originalname}`);
      }
    }

    if (imagesUrl.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true",
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
      demo_url: demo_url || "",
      sampleExcelFileName: sampleExcelFileName || "",
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.error("Error in addProduct:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

//function for list product
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//function for remove product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//function for single product info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//function for upload excel products
const uploadExcelProducts = async (req, res) => {
  try {
    console.log("Excel upload hit");
    console.log("File received:", req.file);

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    // Validate file extension
    const ext = path.extname(req.file.originalname).toLowerCase().slice(1);
    if (!["xlsx", "xls"].includes(ext)) {
      fs.unlinkSync(req.file.path); // Clean up the file
      return res
        .status(400)
        .json({ success: false, message: "Unsupported file format" });
    }

    // Read the file buffer instead of using file path
    const fileBuffer = fs.readFileSync(req.file.path);
    let workbook;

    try {
      workbook = XLSX.read(fileBuffer, { type: "buffer" });
    } catch (readError) {
      fs.unlinkSync(req.file.path); // Clean up the file
      return res.status(400).json({
        success: false,
        message: "Invalid Excel file. Please check the format.",
        error: readError.message,
      });
    }

    if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
      fs.unlinkSync(req.file.path); // Clean up the file
      return res.status(400).json({
        success: false,
        message: "No sheets found in the Excel file",
      });
    }

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Validate worksheet
    if (!worksheet || !worksheet["!ref"]) {
      fs.unlinkSync(req.file.path); // Clean up the file
      return res.status(400).json({
        success: false,
        message: "No data found in the first sheet",
      });
    }

    const sheetData = XLSX.utils.sheet_to_json(worksheet);

    if (!sheetData || sheetData.length === 0) {
      fs.unlinkSync(req.file.path); // Clean up the file
      return res.status(400).json({
        success: false,
        message: "No data found in the sheet",
      });
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
      date: Date.now(),
      demo_url: item.demo_url || "",
    }));

    await productModel.insertMany(formattedData);
    fs.unlinkSync(req.file.path); // Clean up after successful insertion

    res.json({
      success: true,
      message: `${formattedData.length} products inserted successfully`,
    });
  } catch (error) {
    console.error("❌ Error uploading Excel:", error);
    if (req.file?.path) {
      fs.unlinkSync(req.file.path); // Clean up in case of error
    }
    res.status(500).json({
      success: false,
      message: "Server error while processing Excel file",
      error: error.message,
    });
  }
};

export {
  listProducts,
  addProduct,
  removeProduct,
  singleProduct,
  uploadExcelProducts,
};
