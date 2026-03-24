export const BasicInput = ({
  label,
  value,
  placeholder,
  onChangeInput,
  emptyTitle,
  type,
  id,
  emptyValueText,
}) => {
  return (
    <>
      <div className="*:px-3 w-full flex flex-col group">
        <label
          htmlFor={id}
          className="text-gray-400 font-bold group-focus-within:text-amber-200"
        >
          {label}
        </label>
        <input
          type={type}
          value={value}
          onChange={onChangeInput}
          id={id}
          placeholder={placeholder}
          className="border rounded h-10 border-gray-600 outline-0 font-semibold focus:border-amber-200 focus:text-amber-200"
        />
        {emptyTitle && (
          <p className="text-xs text-amber-200">{emptyValueText}</p>
        )}
      </div>
    </>
  );
};

export const Basictextarea = ({
  value,
  placeholder,
  emptyDisc,
  onChangeInput,
}) => {
  return (
    <>
      <div className="flex flex-col w-full *:px-3 group">
        <label
          htmlFor="desc"
          className="text-gray-400 font-bold group-focus-within:text-amber-200"
        >
          Description
        </label>
        <textarea
          name=""
          value={value}
          onChange={onChangeInput}
          id="desc"
          placeholder={placeholder}
          className="border rounded h-20 outline-0 border-gray-600 focus:border-amber-200 focus:text-amber-200"
        ></textarea>
        {emptyDisc && (
          <p className="text-xs text-amber-200">Please Enter The Discription</p>
        )}
      </div>
    </>
  );
};

export const BasicDate = ({
  value,
  onChangeInput,
  emptyStartDate,
  id,
  min,
  label,
}) => {
  return (
    <>
      <div className="flex flex-col *:px-2 group">
        <label
          htmlFor="time"
          className="text-gray-400 font-bold group-focus-within:text-amber-200"
        >
          {label}
        </label>
        <input
          type="date"
          value={value}
          onChange={onChangeInput}
          id={id}
          min={min}
          className="border border-gray-600 rounded h-10 cursor-text w-50 outline-0 focus:border-amber-200 focus:text-amber-200"
        />
        {emptyStartDate && (
          <p className="text-xs text-amber-200">Please Enter The Start Date</p>
        )}
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
          name=""
          onChange={onChangeInput}
          value={status}
          id="UserSelect"
          className="border outline-0 w-full h-10 rounded border-gray-600 px-5 cursor-pointer *:text-slate-950 focus:border-amber-200 focus:text-amber-200"
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
