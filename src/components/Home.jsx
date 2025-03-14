import React from "react";
import TaskForm from "./TaskForm";
import TasksList from "./TasksList";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { FaSun, FaMoon } from "react-icons/fa";
import { toggleDarkMode } from "../features/DarkModeSlice";

function Home() {
  const { loading, error } = useSelector((state) => state.tasks);
  const { darkMode } = useSelector((state) => state.dark);
  const dispatch = useDispatch();

  const toggleMode = () => {
    localStorage.setItem("darkMode", !darkMode);
    dispatch(toggleDarkMode());
  };

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div
      className={`xl:w-[50%] w-full flex items-center px-4 py-6 gap-3 flex-col ${
        darkMode ? "bg-[#02263c]" : "bg-white"
      } rounded-md shadow relative`}
    >
      <button
        className="absolute top-4 right-4  p-1 rounded-md cursor-pointer"
        onClick={toggleMode}
      >
        {!darkMode ? (
          <FaMoon size={22} color="darkblue" />
        ) : (
          <FaSun size={22} color="#ffdd21" />
        )}
      </button>
      <h1 className="mb-3 text-2xl font-bold text-primary">Task Manager 📁 </h1>
      <TaskForm />
      <TasksList />
    </div>
  );
}

export default Home;
