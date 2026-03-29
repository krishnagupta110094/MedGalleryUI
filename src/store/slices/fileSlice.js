// redux/filesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const filesSlice = createSlice({
  name: "files",
  initialState: {
    filesData: [], // category wise files
    loading: false,
    error: null,
  },
  reducers: {
    setFiles: (state, action) => {
      state.filesData = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    removeFileFromState: (state, action) => {
      const { categoryId, fileId } = action.payload;
      state.filesData = state.filesData.map((cat) =>
        cat.categoryId === categoryId
          ? { ...cat, files: cat.files.filter((f) => f._id !== fileId) }
          : cat
      );
    },
  },
});

export const { setFiles, setLoading, setError, removeFileFromState } =
  filesSlice.actions;
export default filesSlice.reducer;