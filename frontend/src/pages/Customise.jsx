/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Title from "../components/Title";

const Customise = () => {
  const location = useLocation();
  const { productName, demoUrl, imageUrls = [] } = location.state || {};
  const [fileMatch, setFileMatch] = useState(false);
  const fileInputRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (productName) {
      fetch(
        `http://localhost:4000/api/checkFileName?productName=${productName}`
      )
        .then((res) => res.json())
        .then((data) => setFileMatch(data.success))
        .catch(() => toast.error("Error checking file!"));
    }
  }, [productName]);

  useEffect(() => {
    if (imageUrls.length) {
      setCurrentImageIndex(0);
    }
  }, [imageUrls]);

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("uploaded_file", file);
      formData.append("productName", productName);

      fetch("http://localhost/app/insert_question.php", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) =>
          data.success
            ? toast.success(`Inserted ${data.rows_inserted} rows successfully!`)
            : toast.error(data.message || "Error uploading file!")
        )
        .catch(() => toast.error("Error uploading file!"));
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 pt-5 pt-0 ">
      {/* Horizontal line below navbar */}
      <hr className="border-t border-gray-300 mb-6 pt-2" />

      <div className="flex justify-center text-base sm:text-2xl mb-4">
        <Title text1={"CUSTOMISATION"} text2={"ASSESSMENT"} />
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-0 max-w-7xl mx-auto w-full px-4 py-5 ">
        {/* Left Section */}
        <div className="md:w-1/2 space-y-4 text-center">
          {/* Image Display */}
          {/* Image Display Box with image and navigation buttons below it */}
          <div className="w-full   overflow-hidden ">
            <div className=" overflow-hidden">
              {imageUrls.length > 0 ? (
                <>
                  <img
                    src={imageUrls[currentImageIndex]}
                    alt={`product-${currentImageIndex}`}
                    className="w-full h-64 object-contain bg-white rounded-t"
                  />
                </>
              ) : (
                <div className="h-64 flex items-center justify-center text-white">
                  No images available
                </div>
              )}
            </div>
          </div>

          {/* OUTSIDE NAVIGATION BUTTONS */}
          <div className="flex justify-center gap-4 mt-4 mb-6">
            <button
              onClick={() =>
                setCurrentImageIndex((prev) =>
                  prev === 0 ? imageUrls.length - 1 : prev - 1
                )
              }
              className="bg-white text-black px-3 py-2 rounded-md shadow hover:bg-gray-200 transition font-semibold"
            >
              ←
            </button>
            <button
              onClick={() =>
                setCurrentImageIndex((prev) =>
                  prev === imageUrls.length - 1 ? 0 : prev + 1
                )
              }
              className="bg-white text-black px-3 py-2 rounded-md shadow hover:bg-gray-200 transition font-semibold"
            >
              →
            </button>
          </div>

          <h2 className="text-lg font-semibold mt-2">Game Name</h2>
          {/* <p className="font-bold">Customisation</p> */}
          <p className="text-gray-600 text-sm">
            You can try the game before customisation
          </p>
          <button
            onClick={() =>
              demoUrl
                ? window.open(demoUrl, "_blank")
                : toast.warning("Demo link not available.")
            }
            className="bg-black text-white px-6 py-2 text-sm mt-2 rounded hover:bg-gray-800"
          >
            Try Game Now
          </button>
          <p className="text-gray-500 text-sm">
            You can now customise the assessment of this game
          </p>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 space-y-6 text-gray-800">
          <h3 className="text-lg font-semibold">
            Steps to customise your game
          </h3>

          {/* Step 1 */}
          <div>
            <p className="font-medium">Step : 1</p>
            <p>Download assessment sample</p>
            <button
              onClick={async () => {
                try {
                  const response = await fetch(
                    `http://localhost:4000/api/excel-files/download?fileName=${productName}`
                  );
                  if (!response.ok) {
                    throw new Error("File not found or download failed");
                  }

                  const blob = await response.blob();
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `${productName}.xlsx`; // Optional: customise extension
                  a.click();
                  window.URL.revokeObjectURL(url);

                  toast.success("Download started!");
                } catch (error) {
                  console.error("Download error:", error);
                  toast.error(`Download failed: ${error.message}`);
                }
              }}
              className="inline-block bg-black text-white px-6 py-2 mt-2 text-sm rounded hover:bg-gray-800"
            >
              Download assessment sample
            </button>
          </div>

          {/* Step 2 */}
          <div>
            <p className="font-medium">Step : 2</p>
            <p>add questions in sample excel file</p>
            <p className="text-sm text-gray-500 mt-2">
              <span className="text-[#999]">Notes :</span>
              <br />
              <span className="text-indigo-600">
                limit is 10, please add 10 question
              </span>
              <br />
              Do not add extra column & do not change column name
            </p>
          </div>

          {/* Step 3 */}
          <div>
            <p className="font-medium">Step : 3</p>
            <p>Upload file</p>
            <button
              onClick={handleUploadClick}
              className="bg-black text-white px-6 py-2 mt-2 text-sm rounded hover:bg-gray-800"
            >
              Browse & upload excel file
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>

          {/* Step 4 */}
          <div>
            <p className="font-medium">Step : 4</p>
            <p>
              You are done uploading file, now you can try the demo with updated
              assessments
            </p>
            <button
              onClick={() =>
                demoUrl
                  ? window.open(demoUrl, "_blank")
                  : toast.warning("Demo link not available.")
              }
              className="bg-black text-white px-6 py-2 mt-2 text-sm rounded hover:bg-gray-800"
            >
              Try the demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customise;
