//-> excelRoute.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const SampleExcelData = () => {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/excel-files`);
      if (res.data.success) {
        setFiles(res.data.files);
      } else {
        toast.error("Failed to fetch files");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error fetching files");
    }
  };

  const deleteFile = async (filename) => {
    try {
      const res = await axios.delete(
        `${backendUrl}/api/excel-files/${filename}`
      );
      if (res.data.success) {
        toast.success("File deleted");
        setFiles((prev) => prev.filter((file) => file !== filename));
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error deleting file");
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="p-4 w-full overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">All Uploaded Sample Excel Files</h2>
      <table className="min-w-[600px] w-full border border-gray-200 text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-3 border-b">File Name</th>
            <th className="py-2 px-3 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-2 px-3 border-b">{file}</td>
              <td className="py-2 px-3 border-b">
                <button
                  onClick={() => deleteFile(file)}
                  className="text-red-600 font-bold text-lg hover:text-red-800"
                >
                 X
                </button>
              </td>
            </tr>
          ))}
          {files.length === 0 && (
            <tr>
              <td colSpan="2" className="py-4 text-center text-gray-500">
                No Excel files found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SampleExcelData;
