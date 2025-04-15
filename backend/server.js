import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import subscribeRouter from "./routes/subscribeRoute.js";
import excelRoute from "./routes/excelRoute.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Set __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB and Cloudinary
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API Endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/subscribe", subscribeRouter);
app.use("/api/excel-files", excelRoute);

app.get("/", (req, res) => {
  res.send("API Working");
});

// New endpoint to check if a file with a matching productName exists
app.get("/api/checkFileName", (req, res) => {
  const { productName } = req.query; // e.g., KBC

  if (!productName) {
    return res.status(400).json({ error: "Missing productName query param" });
  }

  // Adjust the folder path based on your folder structure; here we assume:
  // backend/sample_excel_file
  const folderPath = path.join(__dirname, "sample_excel_file");

  // Read all files in the folder
  let files;
  try {
    files = fs.readdirSync(folderPath);
  } catch (error) {
    console.error("Error reading directory:", error);
    return res.status(500).json({ error: "Cannot read directory" });
  }

  // Convert productName to lowercase for case-insensitive matching
  const productNameLower = productName.toLowerCase();

  // Check if there's a file whose name (without its extension) matches productName
  const matchFound = files.some((file) => {
    const fileNameWithoutExt = path.parse(file).name.toLowerCase(); // e.g., "kbc"
    return fileNameWithoutExt === productNameLower;
  });

  // Send back an object indicating whether the match was found
  res.status(200).json({ success: matchFound });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => console.log("Server Started on PORT : " + port));
}
export default app;

