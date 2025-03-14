import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../features/TaskSlice";
import { useState } from "react";
import EditTask from "./EditTask";
import toast from "react-hot-toast";
import Loader from "./Loader";

function TasksList() {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const { darkMode } = useSelector((state) => state.dark);
  const [searchParam, setSearchParam] = useState("");
  const [status, setStatus] = useState("all");
  const [editing, setEditing] = useState(null);

  // Filter tasks based on the selected filter value and search query
  const filteredTasks = tasks.filter((task) => {
    // Filter by status
    const statusMatch =
      status === "all" || task.status.toLowerCase() === status.toLowerCase();

    // Filter by search query (title or description)
    const searchMatch =
      searchParam === ""
        ? true // If searchParam is empty, include all tasks
        : task.title.toLowerCase().includes(searchParam.toLowerCase()) ||
          task.description.toLowerCase().includes(searchParam.toLowerCase());

    return statusMatch && searchMatch;
  });

  //delete task
  const handleDelete = (id) => {
    dispatch(deleteTask(id));
    toast.success("Task deleted successfully");
  };

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <div>Error fetching tasks: {error.message}</div>;
  }

  return (
    <div className="flex items-center flex-col w-full gap-4">
      <div className="w-full flex items-center justify-between lg:flex-nowrap flex-wrap gap-3">
        <h2 className="text-xl font-semibold text-primary">Task List</h2>
        <div className="w-full lg:w-auto">
          <input
            className="p-2 w-full rounded-md border border-light outline-none text-primary placeholder:text-primary"
            placeholder="Search for task"
            type="text"
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1 lg:w-auto w-full lg:flex-nowrap flex-wrap lg:justify-end text-primary">
          <p>Filter:</p>
          <select
            className="border border-light p-2 rounded lg:w-auto w-full"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all" defaultValue>
              All
            </option>
            <option value="to do">To Do</option>
            <option value="in progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>
      <ul className="space-y-8 w-full">
        {filteredTasks.length > 0 ? (
          filteredTasks.slice(0, 10).map((task) => (
            <li
              key={task.id}
              className={`p-4 ${
                !darkMode ? " bg-gray-100" : "bg-gray-600"
              } rounded-md shadow-sm flex items-center w-full`}
            >
              <div className="flex items-start flex-col gap-2 w-full ">
                <p className="font-semibold capitalize text-secondary text-primary">
                  {task.title}
                </p>
                <p className={`text-sm ${!darkMode? "text-gray-600":"text-gray-200"}`}>{task.description}</p>
                <span
                  className={`rounded-full text-xs font-medium capitalize ${
                    task.status === "done"
                      ? "text-green-600"
                      : task.status === "in progress"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  status: {task.status}
                </span>
              </div>
              <div className="flex items-center gap-2 relative flex-wrap md:flex-nowrap md:w-auto justify-end">
                <button
                  onClick={() => setEditing(task.id)}
                  className="rounded-sm bg-primary cursor-pointer px-3 py-1 w-24 text-white capitalize hover:bg-transparent hover:border hover:border-light hover:text-primary"
                >
                  edit
                </button>
                <button
                  className="rounded-sm bg-red-500 cursor-pointer px-3 py-1 w-24 text-white capitalize hover:bg-transparent hover:border hover:border-red-500 hover:text-red-500"
                  onClick={() => handleDelete(task.id)}
                >
                  delete
                </button>
                {editing === task.id && (
                  <EditTask task={task} onClose={() => setEditing(null)} />
                )}
              </div>
            </li>
          ))
        ) : (
          <div className="flex items-center justify-center w-full mt-4 capitalize">
            No Tasks to show 😢
          </div>
        )}
      </ul>
    </div>
  );
}

export default TasksList;
