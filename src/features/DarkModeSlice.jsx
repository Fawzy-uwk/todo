import { createSlice } from "@reduxjs/toolkit";

// Helper function to sync dark mode with the DOM
const syncDarkModeWithDOM = (isDarkMode) => {
  if (isDarkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

// Load dark mode preference from localStorage
const loadDarkModePreference = () => {
  const savedDarkMode = localStorage.getItem("darkMode");
  return savedDarkMode ? JSON.parse(savedDarkMode) : false;
};

const initialState = {
  darkMode: loadDarkModePreference(),
};

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode; // Toggle dark mode state
      localStorage.setItem("darkMode", JSON.stringify(state.darkMode)); // Save to localStorage
      syncDarkModeWithDOM(state.darkMode); // Sync with the DOM
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
