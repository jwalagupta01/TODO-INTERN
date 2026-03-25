import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/Context";
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
  const todo = useSelector((state) => state.todo.todos);
  const editData = useSelector((state) => state.todo.editTodoId);
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [timeTaken, setTimeTaken] = useState("");
  const [status, setStatus] = useState("");
  const [userID, setUserID] = useState("");
  const [emptyTitle, setEmptytitle] = useState(false);
  const [emptyDisc, setEmptyDisc] = useState(false);
  const [emptyStartDate, setEmptyStartDate] = useState(false);
  const [emptyEndDate, setEmptyEndDate] = useState(false);
  const [emptyTimeTaken, setEmptyTimeTaken] = useState(false);

  const userStatus = [
    {
      // id:wer234,
      // value:"backlog",
      name: "BackLog",
    },
    {
      name: "Assigned",
    },
    {
      name: "In Progress",
    },
    {
      name: "Reviews",
    },
    {
      name: "Done",
    },
  ];

  const checkInput = () => {
    let isValid = true;

    if (!title) {
      setEmptytitle(true);
      isValid = false;
    } else if (!description) {
      setEmptyDisc(true);
      isValid = false;
    } else if (!startDate) {
      setEmptyStartDate(true);
      isValid = false;
    } else if (!endDate) {
      setEmptyEndDate(true);
      isValid = false;
    } else if (!timeTaken) {
      setEmptyTimeTaken(true);
      isValid = false;
    }

    return isValid;
  };

  const formReset = () => {
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setTimeTaken("");
    setStatus("");
    setStatus("");
    setUserID("");
  };

  // add User

  const addTodohandler = (e) => {
    e.preventDefault();
    const isValid = checkInput();
    if (!isValid) return;
    const formData = {
      id: Date.now(),
      title,
      description,
      startDate,
      endDate,
      timeTaken,
      status: status == "" ? "BackLog" : status,
      userID,
    };
    dispatch(addTodo(formData));
    formReset();
    navigate("/alltodo");
  };

  const disabledbtn =
    !title.trim() &&
    !description.trim() &&
    !startDate.trim() &&
    !endDate.trim() &&
    !timeTaken.trim();

  // update User

  const update = (e) => {
    e.preventDefault();
    const isValid = checkInput();
    if (!isValid) return;

    const saveData = {
      id: editData.id,
      title,
      description,
      startDate,
      endDate,
      timeTaken,
      status,
      userID,
    };
    dispatch(editTodo(saveData));
    setUserID("");
    dispatch(setEditData(null));
    formReset();
    navigate("/alltodo");
  };

  useEffect(() => {
    if (!isEdit || !editData) {
      formReset();
      dispatch(setEditData(null));
      return;
    } else if (editData && isEdit) {
      setTitle(editData.title);
      setDescription(editData.description);
      setStartDate(editData.startDate);
      setEndDate(editData.endDate);
      setTimeTaken(editData.timeTaken);
      setStatus(editData.status);
      setUserID(editData.userID === "Not Assigned" ? "" : editData.userID);
    }
  }, [editData && isEdit]);

  const handletitleChange = (e) => {
    setTitle(e.target.value);
    setEmptytitle(false);
  };

  const handletimeTakenChange = (e) => {
    const val = e.target.value;
    if (val === "" || Number(val) >= 1) setTimeTaken(val);
    setEmptyTimeTaken(false);
  };

  const handleDiscChange = (e) => {
    setDescription(e.target.value);
    setEmptyDisc(false);
  };

  const handleStartDate = (e) => {
    setStartDate(e.target.value);
    setEmptyStartDate(false);
  };

  const handleEndDate = (e) => {
    setEndDate(e.target.value);
    setEmptyEndDate(false);
  };

  const handleStatus = (e) => {
    // console.log(e.target.value);
    setStatus(e.target.value);
  };

  const handleuserStatus = (e) => {
    // console.log(e.target.value);
    setUserID(e.target.value);
  };

  const disabledObject = {
    BackLog: ["Assigned", "Done", "In Progress", "Reviews"],
    Assigned: ["Assigned", "Done", "In Progress", "Reviews"],
  };

  const isOptionDisabled = (items, status) => {
    if (!status) return false;
    return disabledObject[items.name]?.includes(status) || false;
  };

  const isUserVisible =
    status == "Assigned" ||
    status == "In Progress" ||
    status == "Reviews" ||
    status == "Done";

  // const isUserDisabled = userID !== "" && userID !== "Not Assigned";
  const isUserDisabled =
    status !== "Assigned" && status !== "Reviews" && status !== "In Progress";

  return (
    <div className="ms-60 px-5 flex items-center justify-center w-full bg-teal-50">
      <form
        action=""
        className="w-full sm:w-full md:w-full lg:w-4/5 xl:w-1/2 2xl:w-2/5"
      >
        <div className="w-full flex flex-col gap-y-3 rounded-lg items-center text-white bg-slate-800 justify-center px-10 py-8 shadow-2xl/70 shadow-black">
          {editData ? (
            <p className="text-3xl text-center font-bold underline text-amber-200">
              UPDATE
            </p>
          ) : (
            <p className="text-3xl text-center font-bold underline text-amber-200">
              ADD TASK
            </p>
          )}
          {/* 1st row -----------------------------start---------------------------------- */}
          <BasicInput
            label="Title"
            placeholder="What do you need to do..!"
            value={title}
            onChangeInput={handletitleChange}
            emptyTitle={emptyTitle}
            type="text"
            emptyValueText="Work Section Is Empty"
          />
          {/* 1st row -------------------------------------------end---------------------------- */}
          {/* 2nd row --------------------------------------start---------------------------------- */}
          <Basictextarea
            placeholder="Enter Your Description"
            value={description}
            onChangeInput={handleDiscChange}
            emptyDisc={emptyDisc}
            label="Start Date"
          />
          {/* 2nd row----------------------------------------end----------------------------------------------- */}
          {/* 3rd row ----------------------------------------start------------------------------------------ */}
          <div className="flex flex-col sm:flex-row items-center w-full justify-between">
            <BasicDate
              value={startDate}
              onChangeInput={handleStartDate}
              emptyStartDate={emptyStartDate}
              id="startDate"
              min=""
              label="Start Date"
            />
            <p className="mt-5">
              <FaArrowRightLong />
            </p>
            <BasicDate
              value={endDate}
              onChangeInput={handleEndDate}
              emptyStartDate={emptyEndDate}
              id="endDate"
              min={startDate}
              label="End Date"
            />
          </div>
          {/* 3rd row-------------------------------end--------------------------------------------- */}
          {/* 4th row  ---------------------------------start-------------------------------------------- */}

          <div className="flex flex-col sm:flex-row justify-between items-center w-full *:w-1/2 gap-x-10">
            <div>
              <BasicInput
                label="Time Taken"
                placeholder="Total Time Taken"
                value={timeTaken}
                onChangeInput={handletimeTakenChange}
                emptyTimeTaken
                type="number"
                id="total_hour"
                emptyTitle={emptyTimeTaken}
                emptyValueText="Taken Time Section Is Empty"
              />
            </div>
            <BasicDropDown
              userStatus={userStatus}
              isOptionDisabled={isOptionDisabled}
              onChangeInput={handleStatus}
              label="Current Status"
              status={status}
              dropDownDiabled={!isEdit}
            />
          </div>
          {/* 4th row -------------------------------end----------------------------------------------- */}
          {/* 5th row--------------------------------start----------------------------------------- */}
          {isUserVisible && (
            <BasicDropDown
              userStatus={user}
              onChangeInput={handleuserStatus}
              label="Select User"
              status={userID}
              dropDownDiabled={isUserDisabled}
            />
          )}
          {/* 5th row ---------------------------------end---------------------------------------- */}
          {/* 6th row ---------------------------------start----------------------------------------- */}
          <div className="flex items-center">
            {editData ? (
              <button
                type="submit"
                disabled={disabledbtn}
                className="border-amber-200 border-2 px-9 py-2 rounded-full text-amber-200 cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out hover:bg-amber-200 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50 disabled:scale-100"
                onClick={update}
              >
                UPDATE
              </button>
            ) : (
              <button
                type="submit"
                disabled={disabledbtn}
                className="border-amber-200 border-2 px-9 py-2 rounded-full text-amber-200 cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out hover:bg-amber-200 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50 disabled:scale-100"
                onClick={addTodohandler}
              >
                SUBMIT
              </button>
            )}
          </div>
          {/* 6th row ------------------------------------end--------------------------------------- */}
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
