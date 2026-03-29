import axios from "axios";
import { useState } from "react";
import BASE_URL from "../api/axios";

const UploadFiles = ({ categories, fetchFiles }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]?._id || "");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !category || !file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("categoryId", category);
    formData.append("file", file);

    try {
      await axios.post(`${BASE_URL}/admin/files`, formData, {
        withCredentials: true,
      });
      alert("File uploaded successfully");
      setTitle("");
      setFile(null);
      fetchFiles();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-8 mt-10">
      <h2 className="text-3xl font-bold mb-4">Upload Image File</h2>
      <form className="flex flex-col gap-4 max-w-md" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="File Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-[#2490EB] text-white px-4 py-2 rounded"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};
export default UploadFiles;
