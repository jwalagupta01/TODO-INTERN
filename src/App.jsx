import React, { useEffect } from "react";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import AddTodo from "./Components/AddTodo";
import AllTodo from "./Components/AllTodo";
import { Routes, Route, useNavigate } from "react-router-dom";
import UserData from "./Components/UserData";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen bg-white">
      <Navbar />
      <div className="flex h-full mt-15 flex-row justify-between">
        <Sidebar />
        <Routes>
          <Route path="/" element={<AddTodo />} />
          <Route
            path="/edit-todo/:todoId"
            element={<AddTodo isEdit="true" />}
          />
          <Route path="/alltodo" element={<AllTodo />} />
          <Route path="/userData" element={<UserData />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

// import React, { useEffect, useState } from "react";

// const App = () => {
//   const [work, setWork] = useState("");
//   const [date, setDate] = useState("");
//   const [todo, setTodo] = useState([]);
//   const [emptyWork, setEmptyWork] = useState(false);
//   const [emptyDate, setEmptyDate] = useState(false);
//   const [inpWork, setInpWork] = useState("");
//   const [inpdate, setInpdate] = useState("");
//   const [editId, setEditid] = useState(null);

//   const addTodo = (e) => {
//     e.preventDefault();
//     if (!work) {
//       setEmptyWork(true);
//       return;
//     } else {
//       if (!date) {
//         setEmptyDate(true);
//         return;
//       }
//     }

//     const newTodo = {
//       id: Date.now(),
//       work,
//       date,
//     };

//     setDate("");
//     setWork("");
//     setTodo([...todo, newTodo]);
//   };

//   const deleteTodo = (id) => {
//     const deleTodo = todo.filter((i) => i.id !== id);
//     setTodo(deleTodo);
//   };

//   const editdata = (id) => {
//     setEditid(id);
//     const editItem = todo.find((i) => i.id == id);
//     setInpWork(editItem.work);
//     setInpdate(editItem.date);
//   };

//   // const saveTodo = () => {

//   //   const update = todo.map(item)

//   // };

//   useEffect(() => {
//     console.log(todo);
//   }, [todo]);

//   return (
//     <div className="flex flex-col items-center h-screen w-screen py-5">
//       <div className="w-200 border flex flex-col py-5 px-9 items-center">
//         <p className="mb-5 font-semibold text-3xl underline">TO-DO</p>
//         <form action="">
//           <div className="flex flex-row gap-x-5">
//             <div>
//               <input
//                 type="text"
//                 value={work}
//                 onChange={(e) => {
//                   setWork(e.target.value);
//                   setEmptyWork(false);
//                 }}
//                 className="border rounded-lg outline-0 w-100 px-4 h-12"
//                 placeholder="What do you need to do..!"
//               />
//               {emptyWork && (
//                 <p className="text-red-600 text-xs">Work Section Is Empty</p>
//               )}
//             </div>
//             <div>
//               <input
//                 type="date"
//                 value={date}
//                 onChange={(e) => {
//                   setDate(e.target.value);
//                   setEmptyDate(false);
//                 }}
//                 className="border rounded-lg outline-0 h-12 cursor-text"
//               />
//               {emptyDate && (
//                 <p className="text-red-500 text-sm">Please Enter The Date</p>
//               )}
//             </div>
//             <div>
//               <button
//                 type="submit"
//                 onClick={addTodo}
//                 disabled={!work.trim() && !date.trim()}
//                 className="bg-green-600 text-2xl text-white px-9 py-2 rounded-xl cursor-pointer"
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </form>
//         <div className="my-5 w-full flex flex-col gap-y-3">
//           {todo.length === 0 ? (
//             <div></div>
//           ) : (
//             <ul className="flex justify-between px-5 *:font-bold">
//               <li>WORK</li>
//               <li>Date</li>
//               <li>Delete/Edit</li>
//             </ul>
//           )}
//           {todo.map((items, index) => (
//             <div
//               className="w-full border rounded-lg flex justify-between items-center px-5 py-3"
//               key={index}
//             >
//               {editId === items.id ? (
//                 <input
//                   type="text"
//                   value={inpWork}
//                   onChange={(e) => {
//                     setInpWork(e.target.value);
//                   }}
//                   className="border"
//                 />
//               ) : (
//                 <p>{items.work}</p>
//               )}
//               {editId === items.id ? (
//                 <input
//                   type="date"
//                   value={inpdate}
//                   onChange={(e) => {
//                     setInpdate(e.target.value);
//                   }}
//                   className="border"
//                 />
//               ) : (
//                 <p>{items.date}</p>
//               )}
//               <div className="flex flex-row gap-3">
//                 <button
//                   type="button"
//                   onClick={() => deleteTodo(items.id)}
//                   className="cursor-pointer bg-red-500 px-8 py-2 rounded-lg text-white"
//                 >
//                   Delete
//                 </button>
//                 {editId === items.id ? (
//                   <button
//                     type="button"
//                     // onClick={saveTodo}
//                     className="cursor-pointer bg-blue-800 px-8 py-2 rounded-lg text-white"
//                   >
//                     save
//                   </button>
//                 ) : (
//                   <button
//                     type="button"
//                     onClick={() => editdata(items.id)}
//                     className="cursor-pointer bg-blue-800 px-8 py-2 rounded-lg text-white"
//                   >
//                     Edit
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
