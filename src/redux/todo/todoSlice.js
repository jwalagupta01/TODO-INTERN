import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    // {
    //   description: "elsdclincx eudhia usdh ciaychisdh ci",
    //   endDate: "2026-03-09",
    //   id: 1773917238982,
    //   startDate: "2026-03-24",
    //   status: "In Progress",
    //   timeTaken: "8",
    //   title: "wejfnlsdij",
    //   userID: "admin1",
    // },
  ],
  editTodoId: null,
};

const todoSlice = createSlice({
  name: "Todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.todos = action.payload;
    },
    editTodo: (state, action) => {
      state.todos = action.payload;
    },
    setEditData: (state, action) => {
      state.editTodoId = action.payload;
    },
  },
});

export const { addTodo, removeTodo, editTodo, setEditData } = todoSlice.actions;
export default todoSlice.reducer;
