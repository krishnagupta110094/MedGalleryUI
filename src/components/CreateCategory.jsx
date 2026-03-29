import axios from "axios";
import { useState } from "react";
import BASE_URL from "../api/axios";


const CreateCategory = ({ fetchCategories }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;
    setLoading(true);
    try {
      await axios.post(
        `${BASE_URL}/admin/categories`,
        { name },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      alert("Category created successfully");
      setName("");
      fetchCategories();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-8 mt-10">
      <h2 className="text-3xl font-bold mb-6 text-[#225082] text-center">
        Create Category
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4"
      >
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2490EB] shadow-sm transition duration-200 placeholder-gray-400"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl text-white font-semibold transition duration-200 
        ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#2490EB] hover:bg-[#225082] shadow-lg"}`}
        >
          {loading ? "Creating..." : "Create Category"}
        </button>
      </form>
    </div>
  );
};
export default CreateCategory;
