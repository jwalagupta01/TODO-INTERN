import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import {
  BasicInput,
  Basictextarea,
  BasicDate,
  BasicDropDown,
} from "./elements/AllInputs";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, editTodo, setEditData } from "../redux/todo/todoSlice";

const AddTodo = ({ isEdit }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.users);
  const todo = useSelector((state) => state.todo.todos);
  const editData = useSelector((state) => state.todo.editTodoId);
  const navigate = useNavigate();

  const formStr = {
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    timeTaken: "",
    status: "",
    userID: "",
  };

  const [formData, setFormData] = useState(formStr);

  const userStatus = [
    "BackLog",
    "Assigned",
    "In Progress",
    "Reviews",
    "Done",
  ].map((name) => ({ name }));

  // if all input are blanks so disabled the button

  const disabledbtn = [
    formData.title,
    formData.description,
    formData.startDate,
    formData.endDate,
    formData.timeTaken,
  ].every((item) => !item.trim());

  const disabledObject = {
    BackLog: ["Assigned", "Done", "In Progress", "Reviews"],
    Assigned: ["Assigned", "Done", "In Progress", "Reviews"],
  };

  const isOptionDisabled = (items, status) => {
    if (!status) return false;
    return disabledObject[items.name]?.includes(status) || false;
  };

  const isUserVisible = ["Assigned", "In Progress", "Reviews", "Done"].includes(
    formData.status,
  );

  const isUserDisabled = !["Assigned", "Reviews", "In Progress"].includes(
    formData.status,
  );

  const handleOnChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  // add and update todo handler

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      id: editData?.id || Date.now(),
      status: formData.status || "BackLog",
      userID: formData.userID || "Not Assigned",
    };
    try {
      isEdit && editData
        ? dispatch(
            editTodo(
              todo.map((item) => (item.id === editData.id ? payload : item)),
            ),
          )
        : dispatch(addTodo(payload));

      dispatch(setEditData(null));
      setFormData(formStr);
      navigate("/alltodo");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (editData && isEdit) {
      setFormData({
        ...editData,
        userID: editData.userID === "Not Assigned" ? "" : editData.userID,
      });
    } else {
      setFormData(formStr);
    }
  }, [editData, isEdit]);

  return (
    <div className="ms-60 px-5 flex items-center justify-center w-full bg-teal-50">
      <form
        action=""
        onSubmit={handleFormSubmit}
        className="w-full sm:w-full md:w-full lg:w-4/5 xl:w-1/2 2xl:w-2/5"
      >
        <div className="w-full flex flex-col gap-y-3 rounded-lg items-center text-white bg-slate-800 justify-center px-10 py-8 shadow-2xl/70 shadow-black">
          <p className="text-3xl text-center font-bold underline text-amber-200">
            {isEdit ? "UPDATE" : "ADD TASK"}
          </p>
          {/* 1st row -----------------------------start---------------------------------- */}
          <BasicInput
            label="Title"
            placeholder="What do you need to do..!"
            value={formData.title}
            onChangeInput={(e) => handleOnChange("title", e.target.value)}
            type="text"
          />
          {/*  */}
          <Basictextarea
            placeholder="Enter Your Description"
            value={formData.description}
            onChangeInput={(e) => handleOnChange("description", e.target.value)}
          />
          <div className="flex flex-col sm:flex-row items-center w-full justify-between">
            {/* Start Date Input */}
            <BasicDate
              value={formData.startDate}
              onChangeInput={(e) => handleOnChange("startDate", e.target.value)}
              id="startDate"
              min=""
              label="Start Date"
            />
            <p className="mt-5">
              <FaArrowRightLong />
            </p>
            {/* End Date Input */}
            <BasicDate
              value={formData.endDate}
              onChangeInput={(e) => handleOnChange("endDate", e.target.value)}
              id="endDate"
              min={formData.startDate}
              label="End Date"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center w-full *:w-1/2 gap-x-10">
            <div>
              {/* time Taken dropDown */}
              <BasicInput
                label="Time Taken"
                placeholder="Total Time Taken"
                value={formData.timeTaken}
                onChangeInput={(e) =>
                  handleOnChange("timeTaken", e.target.value)
                }
                type="number"
                emptyValueText="Taken Time Required"
              />
            </div>
            {/* status DropDown */}
            <BasicDropDown
              userStatus={userStatus}
              isOptionDisabled={isOptionDisabled}
              label="Current Status"
              status={formData.status}
              onChangeInput={(e) => handleOnChange("status", e.target.value)}
              dropDownDiabled={!isEdit}
            />
          </div>
          {/* user dropDown */}
          {isUserVisible && (
            <BasicDropDown
              userStatus={user}
              label="Select User"
              status={formData.userID}
              onChangeInput={(e) => handleOnChange("userID", e.target.value)}
              dropDownDiabled={isUserDisabled}
            />
          )}
          <div className="flex items-center">
            {/* submit button */}
            <button
              type="submit"
              disabled={disabledbtn}
              className="border-amber-200 border-2 px-9 py-2 rounded-full text-amber-200 cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out hover:bg-amber-200 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50 disabled:scale-100"
            >
              {isEdit ? "UPDATE" : "SUBMIT"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
