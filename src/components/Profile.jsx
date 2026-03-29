import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
      <div className="flex flex-col items-center">
        {/* Avatar circle */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#2490EB] to-[#225082] flex items-center justify-center text-white text-3xl font-bold mb-4">
          {user?.name?.charAt(0).toUpperCase() || "U"}
        </div>

        {/* User Name */}
        <h2 className="text-2xl font-bold text-[#225082] mb-2">{user?.name}</h2>

        {/* Role Badge */}
        <span className="px-4 py-1 rounded-full bg-[#2490EB] text-white text-sm font-semibold mb-4">
          {user?.role?.toUpperCase()}
        </span>

        {/* Details */}
        <div className="w-full border-t border-gray-200 pt-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500 font-medium">Username</span>
            <span className="text-gray-700 font-semibold">
              {user?.username}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-500 font-medium">Email</span>
            <span className="text-gray-700 font-semibold">{user?.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Role</span>
            <span className="text-gray-700 font-semibold">{user?.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
