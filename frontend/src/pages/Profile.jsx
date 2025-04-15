import React, { useState } from "react";

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    bio: "",
    profilePic: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profilePic: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Data:", formData);
    alert("Profile saved successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-indigo-300 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
          My Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex justify-center">
            <div className="relative w-32 h-32">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
              rows="4"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
