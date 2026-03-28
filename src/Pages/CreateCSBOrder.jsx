import React, { useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
// import { AllInput } from "../ShipComponents/Elements/AllInput";
import SearchCustomer from "../ShipComponents/SearchCustomer";
import PersonalDetails from "../ShipComponents/PersonalDetails";
import { useState } from "react";

const CreateCSBOrder = () => {
  // const
  const [consignee, setConsignee] = useState(true);
  const [consignor, setConsignor] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="ms-60 p-5 w-full overflow-scroll flex flex-col bg-gray-50">
      <div className="">
        <p className="font-semibold text-2xl">Create CSB-IV Order</p>
        <div className="flex items-center *:text-sm mt-2">
          <p className="text-gray-400 cursor-pointer hover:text-black">
            Orders
          </p>
          <p className="text-gray-400">
            <IoIosArrowForward />
          </p>
          <p className="text-black">Create CSB-IV Order</p>
        </div>
      </div>
      <div>
        <SearchCustomer
          consignee={consignee}
          setConsignor={setConsignor}
          setConsignee={setConsignee}
          setData={setData}
        />
        <PersonalDetails
          consignor={consignor}
          setConsignor={setConsignor}
          setData={setData}
        />
      </div>
    </div>
  );
};

export default CreateCSBOrder;
