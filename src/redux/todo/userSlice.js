import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [
    {
      id: "1",
      name: "admin1",
      email: "admin1@gmail.com",
    },
    {
      id: "2",
      name: "admin2",
      email: "admin2@gmail.com",
    },
    {
      id: "3",
      name: "admin3",
      email: "admin3@gmail.com",
    },
    {
      id: "4",
      name: "admin4",
      email: "admin4@gmail.com",
    },
    {
      id: "5",
      name: "admin5",
      email: "admin5@gmail.com",
    },
  ],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
