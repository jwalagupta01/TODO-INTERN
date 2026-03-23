import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [editData, setEditData] = useState(null);
  const [user, setUser] = useState([
    {
      id: "1",
      name: "admin1",
      email: "admin1@gmail.com",
      isAsigned: [],
    },
    {
      id: "2",
      name: "admin2",
      email: "admin2@gmail.com",
      isAsigned: [],
    },
    {
      id: "3",
      name: "admin3",
      email: "admin3@gmail.com",
      isAsigned: [],
    },
    {
      id: "4",
      name: "admin4",
      email: "admin4@gmail.com",
      isAsigned: [],
    },
    {
      id: "5",
      name: "admin5",
      email: "admin5@gmail.com",
      isAsigned: [],
    },
  ]);
  const [todo, setTodo] = useState([
    {
      description: "elsdclincx eudhia usdh ciaychisdh ci",
      endDate: "2026-03-09",
      id: 1773917238982,
      startDate: "2026-03-24",
      status: "In Progress",
      timeTaken: "8",
      title: "wejfnlsdij",
      userID: "admin1",
      makerUserID: "admin1",
      assignedUSer: "admin 1",
    },
  ]);

  useEffect(() => {
    // console.log(todo);
  }, [todo]);

  const value = {
    todo,
    setTodo,
    editData,
    setEditData,
    user,
    setUser,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
