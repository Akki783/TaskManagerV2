import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [], // array of all tasks
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    // Create (Add Task)
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },

    // Read (No separate action needed — you already have tasks in state)

    // Update Task
    updateTask: (state, action) => {
      const { id, updatedTask } = action.payload;
      const index = state.tasks.findIndex(task => task._id === id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...updatedTask };
      }
    },

    // Delete Task
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task._id !== action.payload);
    },

    // (Optional) Set all tasks (example: after fetching from server)
    setTasks: (state, action) => {
      state.tasks = action.payload;
    }
  },
});

export const { addTask, updateTask, deleteTask, setTasks } = taskSlice.actions;

export default taskSlice.reducer;
