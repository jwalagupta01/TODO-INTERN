import React, { useContext, useState } from "react";
import { FaArrowDown, FaArrowRight } from "react-icons/fa6";
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
  };

  const editClick = (id) => {
    const editItem = todo.find((i) => i.id == id);

    setEditData(editItem);
    navigate("/edit-todo");
  };
  return (
    <div className="ms-60 w-full overflow-scroll gap-3 p-3 bg-teal-100">
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
            <div className="bg-secondary">
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
              <p>{items.userID === "" ? "Not Assigned" : items.userID}</p>
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
                }}
              >
                EDIT
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="rounded-xl px-5 py-4 w-130 bg-teal-500/30 shadow-2xl/50 shadow-black">
        <p className="text-xl font-bold">What do you need to do..!</p>
        <p className="text-xs">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis nulla
          consequatur saepe hic, iusto quidem fuga eligendi ut libero nisi
          ducimus harum quaerat dolores nesciunt, possimus cum ab exercitationem
          molestiae?
        </p>
        <div className="flex items-center justify-between px-5 *:text-sm">
          <p>2026-03-09</p>
          <p>
            <FaArrowRight />
          </p>
          <p>2026-03-09</p>
        </div>
        <p></p>
        <div className="flex justify-center items-center gap-x-2  *:cursor-pointer">
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
      <div className="border w-130 h-60">
        <p>Hello world</p>
      </div> */}
      {/* <div className="border w-130">
        <p>Hello world</p>
      </div>
      <div className="border w-130">
        <p>Hello world</p>
      </div>
      <div className="border w-130">
        <p>Hello world</p>
      </div> */}
    </div>
  );
};

export default AllTodo;
