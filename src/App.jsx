import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import AddTodo from "./Components/AddTodo";
import AllTodo from "./Components/AllTodo";
import { Routes, Route, useNavigate } from "react-router-dom";
import UserData from "./Components/UserData";

const App = () => {
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
