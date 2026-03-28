import React, { useEffect, useState } from "react";
import { BasicDropDown } from "./Elements/AllInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const SearchCustomer = ({ consignee, setConsignee, setConsignor, setData }) => {
  const [changeBtn, setChangeBtn] = useState(false);

  const user = ["user1", "user2", "user3", "user4", "user5", "user6"].map(
    (userId) => ({ userId }),
  );

  const consigneeFormSchema = z.object({
    userID: z.string().nonempty("Please Select Customer"),
  });

  const consigneeForm = useForm({
    mode: "onChange",
    resolver: zodResolver(consigneeFormSchema),
    defaultValues: {
      userID: "",
    },
  });

  const watchValue = consigneeForm.watch();

  const changeUser = () => {
    setConsignor(false);
    setConsignee(true);
    consigneeForm.reset();
    setChangeBtn(false);
  };

  const onhandleSubmit = (data) => {
    try {
      setData((prev) => ({ ...prev, consignorDetails: data }));
      setChangeBtn(true);
      setConsignor(true);
      setConsignee(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full my-4 border border-gray-300 rounded">
      <div className="flex items-center justify-between h-13 border-b border-gray-300 px-8">
        <div className="flex items-center gap-5">
          <p
            className={`px-2 rounded text-white ${consignee ? "bg-black" : "bg-gray-700"}`}
          >
            1
          </p>
          <p className="font-semibold">Consignor Details</p>
        </div>
        {changeBtn && (
          <p
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => {
              changeUser();
            }}
          >
            Change
          </p>
        )}
      </div>
      {consignee && (
        <form onSubmit={consigneeForm.handleSubmit(onhandleSubmit)}>
          <div className="py-3 px-8 bg-white flex">
            <div className="w-3/4 h-40">
              <BasicDropDown
                label="Search Customer"
                fOption="Select Customer"
                list={user}
                name="userID"
                valueKey="userId"
                labelKey="userId"
                form={consigneeForm}
              />
              {!watchValue.userID == "" ? (
                <div className="flex justify-between px-10 py-5 *:text-sm">
                  <div className="w-70">
                    <p className="font-semibold">{watchValue.userID}</p>
                    <p className="text-gray-800">
                      1681@{watchValue.userID}example.com
                    </p>
                    <p className="text-gray-800">+91-9999925167</p>
                  </div>
                  <div>
                    <p className="text-gray-400 font-semibold">Address</p>
                    <p>address 123</p>
                  </div>
                  <div>
                    <p className="text-gray-400 font-semibold">Document Type</p>
                    <p>Aadhar</p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="flex items-end justify-end w-1/4">
              <button
                type="submit"
                className="bg-blue-700 cursor-pointer text-white px-5 py-2 rounded text-sm hover:bg-blue-600"
              >
                Continue
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default SearchCustomer;
