import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: []
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        title: action.payload,
        status: 'Pending'
      };
      state.tasks.push(newTask);
    },
    toggleStatus: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.status = task.status === 'Pending' ? 'Done' : 'Pending';
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    }
  }
});

export const { addTask, toggleStatus, deleteTask } = todoSlice.actions;
export default todoSlice.reducer;
