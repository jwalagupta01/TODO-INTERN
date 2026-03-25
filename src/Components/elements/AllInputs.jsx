export const BasicInput = ({
  label,
  value,
  placeholder,
  onChangeInput,
  type,
  emptyValueText,
}) => {
  return (
    <>
      <div className="*:px-3 w-full flex flex-col group">
        <label className="text-gray-400 font-bold group-focus-within:text-amber-200">
          {label}
        </label>
        <input
          required
          type={type}
          value={value}
          onChange={onChangeInput}
          placeholder={placeholder}
          className="border rounded h-10 border-gray-600 outline-0 font-semibold focus:border-amber-200 focus:text-amber-200"
        />
      </div>
    </>
  );
};

export const Basictextarea = ({ value, placeholder, onChangeInput }) => {
  return (
    <>
      <div className="flex flex-col w-full *:px-3 group">
        <label className="text-gray-400 font-bold group-focus-within:text-amber-200">
          Description
        </label>
        <textarea
          name=""
          required
          value={value}
          onChange={onChangeInput}
          placeholder={placeholder}
          className="border rounded h-20 outline-0 border-gray-600 focus:border-amber-200 focus:text-amber-200"
        ></textarea>
      </div>
    </>
  );
};

export const BasicDate = ({ value, onChangeInput, min, label }) => {
  return (
    <>
      <div className="flex flex-col *:px-2 group">
        <label className="text-gray-400 font-bold group-focus-within:text-amber-200">
          {label}
        </label>
        <input
          required
          type="date"
          value={value}
          onChange={onChangeInput}
          min={min}
          className="border border-gray-600 rounded h-10 cursor-text w-50 outline-0 focus:border-amber-200 focus:text-amber-200"
        />
      </div>
    </>
  );
};

export const BasicDropDown = ({
  status,
  onChangeInput,
  label,
  isOptionDisabled,
  userStatus,
  dropDownDiabled,
}) => {
  return (
    <>
      <div className="flex flex-col *:px-2 group w-full">
        <label
          htmlFor="UserSelect"
          className="font-bold text-gray-400 group-focus-within:text-amber-200"
        >
          {label}
        </label>
        <select
          required
          name=""
          onChange={onChangeInput}
          value={status}
          id="UserSelect"
          className={`border outline-0 w-full h-10 rounded border-gray-600 px-5 *:text-slate-950 focus:border-amber-200 focus:text-amber-200 ${dropDownDiabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          disabled={dropDownDiabled}
        >
          {label == "Current Status" ? (
            ""
          ) : (
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
