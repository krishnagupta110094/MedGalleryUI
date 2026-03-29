import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../api/axios";

const Gallery = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL"); // default ALL
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/categories`);
        const cats = res.data.categories;
        setCategories(cats);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch files based on selected category
  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      try {
        let res;
        if (selectedCategory === "ALL") {
          res = await axios.get(`${BASE_URL}/files/preview`);
          const data = {};
          res.data.data.forEach((cat) => {
            data[cat.category] = cat.files;
          });
          setFiles(data);
        } else {
          const cat = categories.find((c) => c.name === selectedCategory);
          if (!cat) return;
          res = await axios.get(`${BASE_URL}/files?category=${cat._id}`);
          setFiles({ [cat.name]: res.data.data });
        }
      } catch (err) {
        console.error("Error fetching files:", err);
        setFiles({});
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, [selectedCategory, categories]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  };



  return (
    <div className="min-h-screen bg-[#ffffff] pt-16">
      {/* Hamburger Menu for Mobile */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className={`${isSidebarOpen ? "hidden" : "inline-flex"} md:hidden fixed top-20 left-4 z-50 bg-[#225082] text-white p-2 rounded shadow-lg hover:bg-[#2490EB] transition-colors`}
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-[#f0f4f8] p-4 md:p-6 shadow-md transition-transform duration-300 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-48 lg:w-64`}
      >
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-[#225082]">
            Categories
          </h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-[#225082] hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>
        <ul className="space-y-3 md:space-y-4">
          <li
            onClick={() => handleCategoryClick("ALL")}
            className={`cursor-pointer p-2 rounded-md text-sm md:text-base ${
              selectedCategory === "ALL"
                ? "bg-[#2490EB] text-white font-semibold"
                : "text-gray-700 hover:bg-[#e0e7ff]"
            }`}
          >
            ALL
          </li>
          {categories.map((cat) => (
            <li
              key={cat._id}
              onClick={() => handleCategoryClick(cat.name)}
              className={`cursor-pointer p-2 rounded-md text-sm md:text-base ${
                selectedCategory === cat.name
                  ? "bg-[#2490EB] text-white font-semibold"
                  : "text-gray-700 hover:bg-[#e0e7ff]"
              }`}
            >
              {cat.name}
            </li>
          ))}
        </ul>
      </aside>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 px-4 md:px-6 py-4 md:ml-48 lg:ml-64">
        {/* Banner */}
        <div className="bg-[#225082] rounded p-4 md:p-8 mb-6 md:mb-8 text-white flex flex-col items-center justify-center h-32 md:h-40 lg:h-48 text-center">
          <h3 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-2">
            {"#" + selectedCategory}
          </h3>
          <p className="text-sm md:text-lg lg:text-xl">
            {selectedCategory === "ALL"
              ? "Explore top 5 files from all categories"
              : `Explore all medical files in the ${selectedCategory} category.`}
          </p>
        </div>

        {/* Files Grid */}
        {loading ? (
          <p className="text-center text-gray-500">Loading files...</p>
        ) : Object.keys(files).length === 0 ? (
          <p className="text-center text-gray-500">No files found.</p>
        ) : selectedCategory === "ALL" ? (
          // ALL categories → show per category
          Object.keys(files).map((catName) => (
            <div key={catName} className="mb-8">
              <h4 className="text-2xl font-bold text-[#225082] mb-4">
                {catName}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {files[catName].map((file) => (
                  <div
                    key={file._id}
                    className="bg-white p-3 md:p-4 rounded-2xl shadow hover:shadow-lg transition"
                  >
                    <img
                      src={file.fileUrl}
                      alt={file.title || "File"}
                      className="w-full h-32 md:h-48 object-cover rounded-lg mb-3 md:mb-4 cursor-pointer"
                      onClick={() => setSelectedImage(file)}
                    />
                    <h5 className="text-[#225082] font-semibold text-sm md:text-base">
                      {file.title || "Unnamed File"}
                    </h5>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          // Single category
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {files[selectedCategory]?.map((file) => (
              <div
                key={file._id}
                className="bg-white p-3 md:p-4 rounded-2xl shadow hover:shadow-lg transition"
              >
                <img
                  src={file.fileUrl}
                  alt={file.title || "File"}
                  className="w-full h-32 md:h-48 object-cover rounded-lg mb-3 md:mb-4 cursor-pointer"
                  onClick={() => setSelectedImage(file)}
                />
                <h5 className="text-[#225082] font-semibold text-sm md:text-base">
                  {file.title || "Unnamed File"}
                </h5>
              </div>
            ))}
          </div>
        )}
      </main>
      {/* Modal Features */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white p-4 rounded-xl max-w-2xl w-full mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-3 text-xl"
            >
              ✕
            </button>

            {/* Image */}
            <img
              src={selectedImage.fileUrl}
              alt="Preview"
              className="w-full max-h-[70vh] object-contain rounded"
            />

            {/* Title */}
            <h3 className="mt-3 font-semibold text-[#225082]">
              {selectedImage.title || "Unnamed File"}
            </h3>

            
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
