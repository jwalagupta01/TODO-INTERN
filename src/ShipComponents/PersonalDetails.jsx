import React, { useEffect } from "react";
import { BasicDropDown, BasicInput } from "./Elements/AllInput";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const PersonalDetails = ({ list, consignor, setConsignor, setData }) => {
  const [billingAdd, setBillingAdd] = useState(true);
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);

  const personalDataschema = z.object({
    fname: z.string().nonempty("First name is required"),
    lname: z.string().nonempty("Last name is required"),
    mobile: z
      .string()
      .min(10, "Invalid phone number")
      .max(10, "Invalid phone number"),
    email: z.email().nonempty("Please enter a valid email address"),
    country: z.string().nonempty("Please select a country"),
    address1: z.string().nonempty("Address 1 is required"),
    address2: z.string().nonempty("Address 2 is required"),
    landMark: z.string().optional(),
    state: z.string().nonempty("Please select a state"),
    city: z.string().nonempty("City is required"),
    pinCode: z.string().nonempty("Pincode is required"),
    billing_Country: z.string().optional(),
    billing_Address1: z.string().optional(),
    billing_Address2: z.string().optional(),
    billing_Landmark: z.string().optional(),
    billing_State: z.string().optional(),
    billing_City: z.string().optional(),
    billing_Pincode: z.string().optional(),
  });

  const personalDataForm = useForm({
    mode: "onChange",
    resolver: zodResolver(personalDataschema),
    defaultValues: {
      country: "",
      state: "",
      billing_Country: "",
      billing_State: "",
    },
  });

  const onsubmithandler = (data) => {
    try {
      setData((prev) => ({ ...prev, consigneeDetails: data }));
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await axios.get(
          "https://qa2.franchise.backend.shipgl.in/api/v1/location/countries",
        );
        setCountry(res?.data?.data?.countries || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCountry();
  }, []);

  const countryId = personalDataForm.watch("country");
  useEffect(() => {
    if (!countryId) return;

    const fetchState = async () => {
      try {
        const res = await axios.post(
          "https://qa2.franchise.backend.shipgl.in/api/v1/location/statesv2",
          { state_country_code: countryId },
        );
        setState(res?.data?.data?.states);
      } catch (error) {
        console.error(error);
      }
    };

    fetchState();
  }, [countryId]);

  return (
    <div className="w-full my-4 border border-gray-300 *:px-8 rounded">
      <div className="flex h-13 items-center gap-5 border-b border-gray-300 cursor-pointer">
        <p
          className={`px-2 rounded text-white ${consignor ? "bg-black" : " bg-gray-700"}`}
        >
          2
        </p>
        <p className="font-semibold">Consignee Details</p>
      </div>
      {consignor && (
        <form
          onSubmit={personalDataForm.handleSubmit(onsubmithandler)}
          action=""
        >
          <div className="bg-white py-3">
            <p className="font-semibold">Personal Details</p>
            <div className="grid grid-cols-3 mt-2 gap-y-3 justify-between *:w-70">
              <BasicInput
                placeholder="Enter First Name ..."
                label="First Name"
                type="text"
                errors={personalDataForm.formState.errors}
                register={personalDataForm.register}
                name="fname"
              />
              <BasicInput
                placeholder="Enter Last Name ..."
                label="Last Name"
                type="text"
                errors={personalDataForm.formState.errors}
                register={personalDataForm.register}
                name="lname"
              />
              <BasicInput
                placeholder="Enter Mobile Number ..."
                label="Mobile Number"
                type="tel"
                errors={personalDataForm.formState.errors}
                register={personalDataForm.register}
                name="mobile"
              />
              <BasicInput
                placeholder="Enter Email ..."
                label="Email Address"
                type="email"
                errors={personalDataForm.formState.errors}
                register={personalDataForm.register}
                name="email"
              />
            </div>
            <div>
              <p className="font-semibold mt-3">Shipping Address</p>
              <div className="*:w-70 grid grid-cols-3 mt-2 gap-y-3 items-center">
                <BasicDropDown
                  label="Country"
                  list={country}
                  fOption="Select Country"
                  register={personalDataForm.register}
                  errors={personalDataForm.formState.errors}
                  name="country"
                  labelKey="country_name"
                  valueKey="country_iso2"
                />
                <BasicInput
                  placeholder="Enter Address 1 ..."
                  label="Address 1"
                  type="text"
                  errors={personalDataForm.formState.errors}
                  register={personalDataForm.register}
                  name="address1"
                />
                <BasicInput
                  placeholder="Enter Address 2 ..."
                  label="Address 2"
                  type="text"
                  errors={personalDataForm.formState.errors}
                  register={personalDataForm.register}
                  name="address2"
                />
                <BasicInput
                  label="Landmark"
                  placeholder="Enter Landmark ..."
                  type="text"
                  errors={personalDataForm.formState.errors}
                  register={personalDataForm.register}
                  name="landMark"
                />
                <BasicDropDown
                  label="State"
                  list={state}
                  fOption="Select State"
                  register={personalDataForm.register}
                  errors={personalDataForm.formState.errors}
                  name="state"
                  valueKey="state_name"
                  labelKey="state_name"
                />
                <BasicInput
                  placeholder="Enter City ..."
                  label="City"
                  type="text"
                  errors={personalDataForm.formState.errors}
                  register={personalDataForm.register}
                  name="city"
                />
                <BasicInput
                  placeholder="Enter Pincode ..."
                  label="Pincode"
                  type="text"
                  errors={personalDataForm.formState.errors}
                  register={personalDataForm.register}
                  name="pinCode"
                />
              </div>
            </div>
            <div className="flex gap-x-3 mt-4">
              <input
                type="checkbox"
                id="same_address"
                checked={billingAdd}
                onChange={() => setBillingAdd((prev) => !prev)}
              />
              <label htmlFor="same_address" className="font-semibold">
                Billing address is same as shipping address
              </label>
            </div>
            {!billingAdd && (
              <div>
                <p className="font-semibold mt-3">Billing Address</p>
                <div className="*:w-70 grid grid-cols-3 mt-2 gap-y-3 items-center">
                  <BasicDropDown
                    label="Country"
                    list={country}
                    fOption="Select Country"
                    register={personalDataForm.register}
                    errors={personalDataForm.formState.errors}
                    name="state"
                  />
                  <BasicInput
                    placeholder="Enter Address 1 ..."
                    label="Address 1"
                    type="text"
                    errors={personalDataForm.formState.errors}
                    register={personalDataForm.register}
                    name="billing_Country"
                  />
                  <BasicInput
                    placeholder="Enter Address 2 ..."
                    label="Address 2"
                    type="text"
                    errors={personalDataForm.formState.errors}
                    register={personalDataForm.register}
                    name="billing_Address2"
                  />
                  <BasicInput
                    label="Landmark"
                    placeholder="Enter Landmark ..."
                    type="text"
                    errors={personalDataForm.formState.errors}
                    register={personalDataForm.register}
                    name="billing_Landmark"
                  />
                  <BasicDropDown
                    label="State"
                    list={list}
                    fOption="Select Country"
                    register={personalDataForm.register}
                    errors={personalDataForm.formState.errors}
                    name="billing_State"
                  />
                  <BasicInput
                    placeholder="Enter City ..."
                    label="City"
                    type="text"
                    errors={personalDataForm.formState.errors}
                    register={personalDataForm.register}
                    name="billing_City"
                  />
                  <BasicInput
                    placeholder="Enter Pincode ..."
                    label="Pincode"
                    type="text"
                    errors={personalDataForm.formState.errors}
                    register={personalDataForm.register}
                    name="billing_Pincode"
                  />
                </div>
              </div>
            )}
            <div className="flex items-end justify-end">
              <button className="bg-blue-700 px-5 py-2 rounded text-white cursor-pointer hover:bg-blue-600">
                Continue
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default PersonalDetails;
