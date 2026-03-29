// components/AllFiles.js
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setFiles,
  setLoading,
  setError,
  removeFileFromState,
} from "../store/slices/fileSlice";
import BASE_URL from "../api/axios";
import { useEffect } from "react";

const AllFiles = () => {
  const dispatch = useDispatch();
  const { filesData, loading, error } = useSelector((state) => state.files);

  async function fetchFiles() {
    dispatch(setLoading(true));
    try {
      const res = await axios.get(`${BASE_URL}/admin/files`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(setFiles(res.data.files || []));
    } catch (err) {
      dispatch(setError(err.message));
    }
  }

  const handleDelete = async (categoryId, fileId) => {
    if (!window.confirm("Are you sure to delete this file?")) return;

    // Optimistic UI remove
    dispatch(removeFileFromState({ categoryId, fileId }));

    // Send delete request
    try {
      await axios.delete(`${BASE_URL}/admin/files/${fileId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (err) {
      console.error("Delete failed:", err);
      // Optionally refetch all files to sync state
      fetchFiles();
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  if (loading)
    return (
      <p className="text-center text-gray-500 text-lg">Loading files...</p>
    );
  if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;
  if (!filesData.length)
    return <p className="text-center text-gray-500 mt-4">No files found.</p>;

  return (
    <div className="-mt-24">
      <h2 className="text-3xl font-bold text-[#225082] mb-6">
        Manage All Files
      </h2>

      {filesData.map((category) => (
        <div key={category.categoryId} className="mb-8">
          <h3 className="text-2xl font-semibold text-[#225082] mb-4">
            {category.category}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {category.files.map((file) => (
              <div
                key={file._id}
                className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition"
              >
                <img
                  src={file.fileUrl}
                  alt={file.title || "File"}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h4 className="text-[#225082] font-semibold mb-1">
                  {file.title || "Unnamed File"}
                </h4>
                <button
                  onClick={() => handleDelete(category.categoryId, file._id)}
                  className="w-full py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllFiles;
