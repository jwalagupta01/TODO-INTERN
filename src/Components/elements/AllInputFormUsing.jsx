export const BasicInput = ({
  label,
  placeholder,
  register,
  name,
  type,
  errors,
}) => {
  return (
    <>
      <div className="*:px-3 w-full flex flex-col group">
        <label className="text-gray-400 font-bold group-focus-within:text-amber-200">
          {label}
        </label>
        <input
          type={type}
          {...register(name)}
          placeholder={placeholder}
          className="border rounded h-10 border-gray-600 outline-0 font-semibold focus:border-amber-200 focus:text-amber-200"
        />
        {errors[name] && (
          <p className="text-xs mt-2 text-red-500">{errors[name].message}</p>
        )}
      </div>
    </>
  );
};

export const Basictextarea = ({ placeholder, register, name, errors }) => {
  return (
    <>
      <div className="flex flex-col w-full *:px-3 group">
        <label className="text-gray-400 font-bold group-focus-within:text-amber-200">
          Description
        </label>
        <textarea
          {...register(name)}
          placeholder={placeholder}
          className="border rounded h-20 outline-0 border-gray-600 focus:border-amber-200 focus:text-amber-200"
        ></textarea>
        {errors[name] && (
          <p className="text-xs mt-2 text-red-500">{errors[name].message}</p>
        )}
      </div>
    </>
  );
};

export const BasicDate = ({ min, label, register, name, errors }) => {
  return (
    <>
      <div className="flex flex-col *:px-2 group">
        <label className="text-gray-400 font-bold group-focus-within:text-amber-200">
          {label}
        </label>
        <input
          type="date"
          min={min}
          {...register(name)}
          className="border border-gray-600 rounded h-10 cursor-text w-50 outline-0 focus:border-amber-200 focus:text-amber-200"
        />
        {errors[name] && (
          <p className="text-xs mt-2 text-red-500">{errors[name].message}</p>
        )}
      </div>
    </>
  );
};

export const BasicDropDown = ({
  label,
  name,
  register,
  isOptionDisabled,
  userStatus,
  status,
  dropDownDiabled,
}) => {
  return (
    <>
      <div className="flex flex-col *:px-2 group w-full">
        <label className="font-bold text-gray-400 group-focus-within:text-amber-200">
          {label}
        </label>
        <select
          {...register(name)}
          className={`border outline-0 w-full h-10 rounded border-gray-600 px-5 *:text-slate-950 focus:border-amber-200 focus:text-amber-200 ${dropDownDiabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          disabled={dropDownDiabled}
        >
          {label == "Select User" && (
            <option value="" disabled>
              Select User
            </option>
          )}
          {userStatus.map((items, index) => (
            <option
              key={index}
              className={`${isOptionDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
              value={items.name}
              disabled={isOptionDisabled?.(items, status)}
            >
              {items.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
