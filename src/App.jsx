import React, { useEffect } from "react";
import AppRoutes from "./AppRoutes";
import { useDispatch } from "react-redux";
import { setUser } from "./store/slices/authSlice";
import axios from "axios";
import BASE_URL from "./api/axios";

const App = () => {
  const dispatch = useDispatch();

  // ✅ On app start, fetch current user from backend (cookie-based)
  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }, // send cookie
        );

        if (data.success && data.user) {
          dispatch(setUser(data.user));
        }
      } catch (err) {
        console.log("No user logged in");
        console.log(err);
      }
    };

    loadUser();
  }, [dispatch]);
  return (
    <div>
      <AppRoutes />
    </div>
  );
};

export default App;
