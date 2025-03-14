import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  loading: false,
  error: null,
  status: "All",
};

// export const fetchTasks = createAsyncThunk(
//   "tasks/Todo",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetch(
//         "https://jsonplaceholder.typicode.com/todos"
//       );
//       const data = await response.json();

//       return data.map((task) => ({
//         id: task.id,
//         title: task.title,
//         description: "",
//         status: task.completed ? "Completed" : "Pending",
//       }));
//     } catch (error) {
//       console.error("Fetch error:", error);
//       return rejectWithValue(error.message);
//     }
//   }
// );

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Add a new task
    addTask: (state, action) => {
      state.loading = true;
      state.tasks.unshift(action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); // Sync after adding
      state.loading = false;
    },

    // Delete a task
    deleteTask: (state, action) => {
      state.loading = true;
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); // Sync after deleting
      state.loading = false;
    },

    // Update a task
    updateTask(state, action) {
      state.loading = true;
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); // Sync after deleting
      state.loading = false;
    },

    // Set the status filter
    setStatus: (state, action) => {
      state.loading = true;
      state.status = action.payload;
      state.loading = false;
    },
  },

  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchTasks.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(fetchTasks.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.tasks = action.payload;
  //     })
  //     .addCase(fetchTasks.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.error.message;
  //       console.log("Fetch failed:", action.error.message); // Log error
  //     });
  // },
});

export const { addTask, deleteTask, updateTask } = taskSlice.actions;

export default taskSlice.reducer;
