import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // store user info
  loading: false, // loading state for login/register
  error: null, // store error messages
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
});

export const { setUser, setError, setLoading, logout } = authSlice.actions;
export default authSlice.reducer;
