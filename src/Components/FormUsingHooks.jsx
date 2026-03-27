import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import {
  BasicInput,
  Basictextarea,
  BasicDate,
  BasicDropDown,
} from "./elements/AllInputFormUsing";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, editTodo, setEditData } from "../redux/todo/todoSlice";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const AddTodo = ({ isEdit }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.users);
  const todo = useSelector((state) => state.todo.todos);
  const editData = useSelector((state) => state.todo.editTodoId);
  const navigate = useNavigate();

  const formSchema = z.object({
    title: z
      .string()
      .min(10, "Minimum Length Should Be 10")
      .max(50, "Maximum Length Should Be 50")
      .nonempty("Title Is Required"),
    description: z
      .string()
      .max(200, "Miximum Length Should Be 200")
      .nonempty("Description is Required"),
    startDate: z.string().nonempty("Start Date Is Required"),
    endDate: z.string().nonempty("EndDate is Required"),
    timeTaken: z.coerce.number().min(1, "Time Taken is required"),
    status: z.string().optional().default("Not Assigned"),
    userID: z.string().optional().default("Not Assigned"),
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: "BackLog",
      userID: "",
    },
    mode: "onChange",
    resolver: zodResolver(formSchema),
  });

  const watchValue = watch();

  const userStatus = [
    "BackLog",
    "Assigned",
    "In Progress",
    "Reviews",
    "Done",
  ].map((name) => ({ name }));

  // if all input are blanks so disabled the button

  const disabledbtn = [
    watchValue.title,
    watchValue.description,
    watchValue.startDate,
    watchValue.endDate,
    watchValue.timeTaken,
  ].every((item) => !item);

  const disabledObject = {
    BackLog: ["Assigned", "Done", "In Progress", "Reviews"],
    Assigned: ["Assigned", "Done", "In Progress", "Reviews"],
  };

  const isOptionDisabled = (items, status) => {
    if (!status) return false;
    return disabledObject[items.name]?.includes(status) || false;
  };

  const isUserVisible = ["Assigned", "In Progress", "Reviews", "Done"].includes(
    watchValue.status,
  );

  const isUserDisabled = !["Assigned", "Reviews", "In Progress"].includes(
    watchValue.status,
  );

  // add and update todo handler

  const handleFormSubmit = (data) => {
    const formatDate = (date) => {
      return new Date(date).toISOString().split("T")[0];
    };
    const payLoad = {
      ...data,
      id: editData?.id || Date.now(),
      startDate: formatDate(data.startDate),
      endDate: formatDate(data.endDate),
      status: data.status || "BackLog",
      userID: data.userID || "Not Assigned",
    };
    try {
      isEdit && editData
        ? dispatch(
            editTodo(
              todo.map((item) => (item.id === editData.id ? payLoad : item)),
            ),
          )
        : dispatch(addTodo(payLoad));

      navigate("/allTodo");
      dispatch(setEditData(null));
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (editData && isEdit) {
      reset({
        ...editData,
        userID: editData.userID === "Not Assigned" ? "" : editData.userID,
      });
    } else {
      reset();
    }
  }, [editData && isEdit]);

  return (
    <div className="ms-60 px-5 flex items-center justify-center w-full bg-teal-50">
      <form
        action=""
        onSubmit={handleSubmit(handleFormSubmit)}
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
            register={register}
            name="title"
            type="text"
            errors={errors}
          />
          {/*  */}
          <Basictextarea
            placeholder="Enter Your Description"
            register={register}
            name="description"
            errors={errors}
          />
          <div className="flex flex-col sm:flex-row items-center w-full justify-between">
            {/* Start Date Input */}
            <BasicDate
              name="startDate"
              register={register}
              id="startDate"
              min=""
              label="Start Date"
              errors={errors}
            />
            <p className="mt-5">
              <FaArrowRightLong />
            </p>
            {/* End Date Input */}
            <BasicDate
              name="endDate"
              register={register}
              errors={errors}
              id="endDate"
              min={watchValue.startDate}
              label="End Date"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center w-full *:w-1/2 gap-x-10">
            <div>
              {/* time Taken dropDown */}
              <BasicInput
                label="Time Taken"
                errors={errors}
                placeholder="Total Time Taken"
                name="timeTaken"
                register={register}
                type="number"
                emptyValueText="Taken Time Required"
              />
            </div>
            {/* status DropDown */}
            <BasicDropDown
              userStatus={userStatus}
              isOptionDisabled={isOptionDisabled}
              label="Current Status"
              dropDownDiabled={!isEdit}
              name="status"
              register={register}
              status={watchValue.status}
            />
          </div>
          {/* user dropDown */}
          {isUserVisible && (
            <BasicDropDown
              userStatus={user}
              label="Select User"
              dropDownDiabled={isUserDisabled}
              name="userID"
              register={register}
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
