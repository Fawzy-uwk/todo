import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid4 } from "uuid";
import { addTask } from "../features/TaskSlice";
import { ClockLoader } from "react-spinners";
import { toast } from "react-hot-toast";
import Loader from "./Loader";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state.tasks);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add new task to the list
    const newTask = {
      id: uuid4(),
      title,
      description,
      status,
    };

    // Update local storage with the updated tasks array
    const updatedTasks = [newTask, ...tasks]; // Add new task to the beginning (matches unshift)
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    dispatch(addTask(newTask));
    // Reset form inputs
    setTitle("");
    setDescription("");
    setStatus("To Do");
    toast.success("Task added successfully 😍 ");
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <form
      className="w-full flex items-start gap-5 flex-col mb-5"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold text-primary capitalize">
        Add new task
      </h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter Task Name"
        className="border rounded-sm border-light p-2 w-full focus:outline-none text-primary placeholder:text-primary"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter Task Description"
        className="border rounded-sm border-light p-2 min-h-24 w-full max-h-96 focus:outline-none text-primary placeholder:text-primary"
        required
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border rounded-sm border-light p-2 w-full max-h-96 focus:outline-none text-primary placeholder:text-primary"
      >
        <option value="to do">To Do</option>
        <option value="in progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <button
        type="submit"
        className="bg-primary w-full cursor-pointer hover:bg-transparent hover:border border-light hover:text-primary text-white p-2 rounded-md"
      >
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
