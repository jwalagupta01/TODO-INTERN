import React from "react";

export const BasicInput = ({
  placeholder,
  label,
  type,
  errors,
  register,
  name,
}) => {
  return (
    <div className="w-full">
      <label htmlFor={label}>
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={type}
        id={label}
        {...register(name)}
        placeholder={placeholder}
        className="bg-white border border-gray-300 rounded h-10 w-full px-3 font-medium outline-0 focus:border-blue-800"
      />
      {errors[name] && (
        <p className="text-xs text-red-500">{errors[name].message}</p>
      )}
    </div>
  );
};

export const BasicDropDown = ({
  label,
  list,
  fOption,
  register,
  errors,
  name,
  valueKey,
  labelKey,
}) => {
  return (
    <>
      <div className="w-full">
        <label htmlFor="">
          {label} <span className="text-red-500">*</span>
        </label>
        <select
          {...register(name)}
          className="border border-gray-300 outline-none rounded w-full h-10 px-5 focus:border-blue-800"
        >
          <option value="" disabled>
            {fOption}
          </option>
          {list?.map((items, index) => (
            <option value={items[valueKey]} key={index}>
              {items[labelKey]}
            </option>
          ))}
        </select>
        {errors[name] && (
          <p className="text-red-500 text-xs">{errors[name].message}</p>
        )}
      </div>
    </>
  );
};
