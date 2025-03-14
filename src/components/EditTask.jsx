import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../features/TaskSlice";

function EditTask({ task, onClose }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const dispatch = useDispatch();

  const handleUpdateTask = (e) => {
    e.preventDefault();
    dispatch(updateTask({ id: task.id, title, description, status }));
    onClose(); // Close the edit form after updating
  };

  return (
    <form
      className="absolute -top-3 -left-10 p-3 bg-gray-50 shadow flex items-start gap-5 flex-col mb-5 rounded-md xl:w-96 sm:w-72 w-52 z-50 "
      onSubmit={handleUpdateTask}
    >
      <h2 className="text-xl font-semibold text-primary capitalize">
        Edit Task
      </h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter Task Name"
        className="border rounded-sm border-light p-2 w-full focus:outline-none"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter Task Description"
        className="border rounded-sm border-light p-2 min-h-24 w-full max-h-64 focus:outline-none"
        required
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border rounded-sm border-light p-2 w-full max-h-96 focus:outline-none"
      >
        <option value="to do">To Do</option>
        <option value="in progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <div className="flex items-center justify-between w-full gap-2">
        <button
          type="submit"
          className="bg-primary  cursor-pointer hover:bg-transparent hover:border border-light hover:text-primary text-white p-2 rounded-md"
        >
          Edit Task
        </button>
        <button
          type="button"
          onClick={onClose} // Close the edit form without saving
          className="bg-gray-400  cursor-pointer hover:bg-transparent hover:border border-light hover:text-primary text-white p-2 rounded-md"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditTask;
