/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { ToastContainer, toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [bestseller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [demoUrl, setDemoUrl] = useState("");
  const [excelFile, setExcelFile] = useState(null); // ⬅️ New state

  // Replace this part inside your `onSubmitHandler`
  // In Add.jsx, modify the onSubmitHandler function
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let excelFileName = ""; // Initialize excel filename

      // ✅ Upload Excel file if it exists
      if (excelFile) {
        excelFileName = excelFile.name; // Get the filename
        const excelFormData = new FormData();
        excelFormData.append("excelFile", excelFile);

        const excelRes = await axios.post(
          `${backendUrl}/api/product/upload-excel`,
          excelFormData,
          {
            headers: {
              token,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (!excelRes.data.success) {
          toast.error(excelRes.data.message);
          return;
        } else {
          toast.success(excelRes.data.message);
        }
      }

      // ✅ Now continue with adding the product
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("demo_url", demoUrl);
      formData.append("sampleExcelFileName", excelFileName); // Add the excel filename

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setDemoUrl("");
        setExcelFile(null);
        setSizes([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload Image</p>

        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>

          <label htmlFor="image2">
            <img
              className="w-20"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>

          <label htmlFor="image3">
            <img
              className="w-20"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>

          <label htmlFor="image4">
            <img
              className="w-20"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write Content here"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            value={category} // Ensure the selected value is bound to state
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Quiz-Based_Games">Quiz-Based Games</option>
            <option value="Puzzle_&_Logic_Games">Puzzle & Logic Games</option>
            <option value="Action-Based_Learning_Games">
              Action-Based Learning Games
            </option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub Category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Text-Based_Questions">Text-Based Questions </option>
            <option value="Word_Puzzles">Word Puzzles</option>
            <option value="Shooting_With_MCQs">Shooting with MCQs</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="Number"
            placeholder="25"
          />
        </div>
      </div>

      {/* 3-M */}
      <div>
        <p className="mb-2">Our Support Packs</p>
        <div className="flex gap-3">
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("3-M")
                  ? prev.filter((item) => item !== "3-M")
                  : [...prev, "3-M"]
              )
            }
          >
            <p
              className={`
             ${
               sizes.includes("3-M")
                 ? "bg-pink-100 border-2 border-pink-400"
                 : "bg-slate-200"
             }
               px-3 py-1 cursor-pointer
             `}
            >
              3-M
            </p>
          </div>

          {/* 6-M */}
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("6-M")
                  ? prev.filter((item) => item !== "6-M")
                  : [...prev, "6-M"]
              )
            }
          >
            <p
              className={`
              ${
                sizes.includes("6-M")
                  ? "bg-pink-100 border-2 border-pink-400"
                  : "bg-slate-200"
              }
             px-3 py-1 cursor-pointer
           `}
            >
              6-M
            </p>
          </div>

          {/* 12-M */}
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("12-M")
                  ? prev.filter((item) => item !== "12-M")
                  : [...prev, "12-M"]
              )
            }
          >
            <p
              className={`
              ${
                sizes.includes("12-M")
                  ? "bg-pink-100 border-2 border-pink-400"
                  : "bg-slate-200"
              }
              px-3 py-1 cursor-pointer
           `}
            >
              12-M
            </p>
          </div>

          {/*18-M */}
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("18-M")
                  ? prev.filter((item) => item !== "18-M")
                  : [...prev, "18-M"]
              )
            }
          >
            <p
              className={`
              ${
                sizes.includes("18-M")
                  ? "bg-pink-100 border-2 border-pink-400"
                  : "bg-slate-200"
              }
                px-3 py-1 cursor-pointer
              `}
            >
              18-M
            </p>
          </div>

          {/* One-Time */}
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("One-Time")
                  ? prev.filter((item) => item !== "One-Time")
                  : [...prev, "One-Time"]
              )
            }
          >
            <p
              className={`
      ${
        sizes.includes("One-Time")
          ? "bg-pink-100 border-2 border-pink-400"
          : "bg-slate-200"
      }
      px-3 py-1 cursor-pointer
    `}
            >
              One-Time
            </p>
          </div>
        </div>
      </div>

      <div>
        <p className="mb-2">Customise</p>

        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-center"></h2>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-start gap-3 flex-wrap">
          {/* Upload Excel */}
          <label
            htmlFor="excel-upload"
            className="cursor-pointer bg-gray-200 text-sm sm:text-base px-3 py-2 sm:px-6 sm:py-3 rounded-md hover:bg-gray-300 transition duration-300 flex items-center gap-2"
          >
            📤 Upload Excel File
            <input
              type="file"
              id="excel-upload"
              accept=".xls,.xlsx"
              className="hidden"
              onChange={(e) => setExcelFile(e.target.files[0])}
            />
          </label>
          {excelFile && (
            <p className="text-sm text-gray-600 mt-1">
              Selected: {excelFile.name}
            </p>
          )}
        </div>

        <div className="w-full flex flex-col">
          <p className="mb-2 mt-2"> Demo URL</p>

          <input
            id="demo-url"
            onChange={(e) => setDemoUrl(e.target.value)}
            value={demoUrl}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
            type="url"
            placeholder="https://example.com/demo"
          />
        </div>

        {/* Toast Notification Container */}
        <ToastContainer position="top-center" autoClose={3000} />
      </div>

      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setBestSeller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to BestSeller
        </label>
      </div>

      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        ADD
      </button>
    </form>
  );
};

export default Add;
