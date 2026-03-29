import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logout } from "../store/slices/authSlice";
import CreateCategory from "../components/CreateCategory";
import UploadFiles from "../components/UploadFiles";
import AllFiles from "../components/AllFiles";
import Profile from "../components/Profile";
import BASE_URL from "../api/axios";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [categories, setCategories] = useState([]);
  const [files, setFiles] = useState([]);
  const [selectedTab, setSelectedTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch categories (admin only)
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/categories`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCategories(res.data.categories || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch all files (admin only)
  const fetchFiles = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/files/preview`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFiles(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === "admin") {
      fetchCategories();
      fetchFiles();
    }
  }, [user]);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      dispatch(logout());
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
      // still clear state to avoid stuck UI
      dispatch(logout());
      navigate("/");
    }
  };

  const handleTabClick = (item) => {
    if (item === "logout") {
      handleLogout();
    } else {
      setSelectedTab(item);
    }
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const navItems =
    user && user?.role === "admin"
      ? ["profile", "createCategory", "uploadFiles", "allFiles", "logout"]
      : ["profile", "logout"];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f9f9f9] pt-16">
      {/* Hamburger Menu for Mobile */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className={`${isSidebarOpen ? "hidden" : "inline-flex"} md:hidden fixed top-20 left-4 z-50 bg-[#225082] text-white p-2 rounded shadow-lg hover:bg-[#2490EB] transition-colors`}
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed  -left-1 z-40 bg-[#225082] text-white p-6 flex flex-col gap-4 transition-transform duration-300 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:top-1  md:left-0 md:bottom-auto md:translate-x-0 md:w-48 md:shadow-none md:rounded-none lg:static lg:w-64`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-white hover:text-gray-300 text-xl"
          >
            ✕
          </button>
        </div>
        {navItems.map((item) => (
          <button
            key={item}
            className={`text-left py-2 px-4 rounded hover:bg-[#2490EB] transition-colors ${
              selectedTab === item ? "bg-[#2490EB]" : ""
            }`}
            onClick={() => handleTabClick(item)}
          >
            {item === "createCategory"
              ? "Create Category"
              : item === "uploadFiles"
                ? "Upload Files"
                : item === "allFiles"
                  ? "All Files"
                  : item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </aside>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 mt-24 mx-auto max-w-full transition-all duration-300">
        {selectedTab === "profile" && <Profile />}

        {selectedTab === "createCategory" && (
          <CreateCategory fetchCategories={fetchCategories} />
        )}

        {selectedTab === "uploadFiles" && (
          <UploadFiles categories={categories} fetchFiles={fetchFiles} />
        )}

        {selectedTab === "allFiles" && (
          <AllFiles files={files} loading={loading} fetchFiles={fetchFiles} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
