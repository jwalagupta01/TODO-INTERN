import React, { useContext, useEffect, useState } from "react";
// import { user } from "../mock/user";
import { FaRegUser } from "react-icons/fa";
import { AppContext } from "../Context/Context";
import { FaArrowDown } from "react-icons/fa6";

const UserData = () => {
  const { todo, setTodo, user, setUser } = useContext(AppContext);
  const [userWork, setUserWork] = useState([]);
  const [showUserWork, setShowUserWork] = useState("");

  const showWork = (name) => {
    setShowUserWork(name);
    const work = todo.filter((i) => i.userID == name);
    setUserWork(work);
  };

  useEffect(() => {
    console.log(userWork);
  }, [userWork]);

  return (
    <div className="w-full h-full flex py-4 px-2 overflow-scroll">
      <div className="w-full flex flex-col gap-y-3">
        {user.map((items, index) => (
          <div key={index} className="">
            <div className="w-full bg-slate-700 rounded-xl flex flex-row items-center justify-between py-3 px-3 shadow-2xl/30 *:text-white">
              <div className="flex gap-x-2 items-center">
                <p className="text-4xl h-full">
                  <FaRegUser />
                </p>
                <div>
                  <p className="font-semibold">{items.name}</p>
                  <p className="text-sm text-gray-500">{items.email}</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm">Assigned Work</p>
                <p>{items.isAsigned.length}</p>
              </div>
              <div></div>
              {showUserWork !== items.name ? (
                <button
                  type="button"
                  onClick={() => {
                    showWork(items.name);
                  }}
                  className="px-7 py-2 border text-sm border-white rounded-xl cursor-pointer hover:bg-teal-400 hover:text-black hover:scale-110 transition-all duration-300 ease-in-out"
                >
                  Show Work
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setShowUserWork("");
                  }}
                  className="px-7 py-2 border text-sm border-white rounded-xl cursor-pointer hover:bg-teal-400 hover:text-black hover:scale-110 transition-all duration-300 ease-in-out"
                >
                  Hide Work
                </button>
              )}
            </div>
            {showUserWork === items.name &&
              userWork.map((items, index) => (
                <div
                  key={index}
                  className="flex border-b pe-10 border-gray-500 bg-white items-center justify-between mx-3 p-3 shadow-2xl/30 rounded"
                >
                  <div>
                    <p className="ps-2 w-70 text-lg font-semibold">
                      {items.title}
                    </p>
                    <p className="text-xs text-gray-400 font-bold">
                      Description
                    </p>
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
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserData;
