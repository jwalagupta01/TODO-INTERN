import React, { useContext, useState } from "react";
import { FaArrowDown } from "react-icons/fa6";
import { AppContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";

const AllTodo = () => {
  const { todo, setTodo, editData, setEditData, user, setUser } =
    useContext(AppContext);
  const navigate = useNavigate();

  const deleteTodo = (id) => {
    // Remove todo
    const delTodo = todo.filter((i) => i.id !== id);
    setTodo(delTodo);

    // Remove todo id from user

    const upadteUser = user.map((u) => ({
      ...u,
      isAsigned: u.isAsigned.filter((todoId) => todoId !== id),
    }));

    setUser(upadteUser);
  };

  const editClick = (id) => {
    const editItem = todo.find((i) => i.id == id);

    setEditData(editItem);
  };

  return (
    <div className="w-full h-auto overflow-scroll">
      <div className="flex flex-row justify-between px-6 py-3 border-b border-gray-400 *:font-bold *:text-gray-600">
        <div className="w-70">TASK</div>
        <div>start To End</div>
        <div>Time Take</div>
        <div>Status</div>
        <div>Delete / Save</div>
      </div>
      <div className="mt-5 flex flex-col gap-y-2">
        {todo.map((items, index) => (
          <div
            key={index}
            className="flex bg-white items-center justify-between mx-3 p-3 shadow-2xl/30 rounded"
          >
            <div>
              <p className="ps-2 w-70 text-lg font-semibold">{items.title}</p>
              <p className="text-xs text-gray-400 font-bold">Description</p>
              <p className="ps-2 text-sm w-70">{items.description}</p>
            </div>
            <div className="flex items-center justify-center flex-col *:text-sm">
              <p>{items.startDate}</p>
              <p>
                <FaArrowDown />
              </p>
              <p>{items.endDate}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">{items.timeTaken} hr.</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p>{items.status}</p>
              <p className="text-xs">To</p>
              <p>{items.userID}</p>
            </div>

            <div className="flex items-center gap-x-2 *:text-white *:cursor-pointer">
              <button
                type="button"
                onClick={() => {
                  deleteTodo(items.id);
                }}
                className="bg-red-600 px-5 py-2 rounded-lg text-xs"
              >
                DELETE
              </button>
              <button
                type="button"
                className="bg-blue-600 px-5 py-2 rounded-lg text-xs"
                onClick={() => {
                  editClick(items.id);
                  navigate("/");
                }}
              >
                EDIT
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTodo;
