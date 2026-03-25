import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    {
      description: "elsdclincx eudhia usdh ciaychisdh ci",
      endDate: "2026-03-09",
      id: 1773917238982,
      startDate: "2026-03-24",
      status: "In Progress",
      timeTaken: "8",
      title: "wejfnlsdij",
      userID: "admin1",
    },
  ],
};

const todoSlice = createSlice({
  name: "Todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: action.payload,
        title: action.payload,
        description: "elsdclincx eudhia usdh ciaychisdh ci",
        startDate: action.payload,
        endDate: action.payload,
        timeTaken: action.payload,
        status: action.payload,
        userID: action.payload,
      };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    editTodo: (state, action) => {},
  },
});

export const { addTodo, removeTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
