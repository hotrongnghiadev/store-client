import clsx from "clsx";
import { useRef } from "react";

import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";

const SelectField = (props) => {
  const {
    required,
    error,
    setValue,
    value,
    label,
    control,
    defaultValue,
    fieldId,
    options,
    placeholder,
    ...moreProps
  } = props;
  const selectRef = useRef();
  return (
    <div className="mt-4 flex w-full flex-col">
      <label onClick={() => selectRef.current.focus()}>
        {label}
        {required && <span className="pl-1 text-red-500">*</span>}
      </label>
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={fieldId}
        render={({ field: { onChange } }) => (
          <Select
            menuPlacement="auto"
            classNames={{
              placeholder: () => "!text-sm",
              menu: () => "!z-99",
              menuList: () => "!p-0",
              container: () => "min-w-fit ",
              option: (state) =>
                clsx({
                  "!bg-transparent !text-blue-500": state.isSelected,
                }),
              control: (state) =>
                clsx({
                  "!shadow-none": state.isFocused,
                  "!border-slate-200": !state.isFocused,
                }),
            }}
            options={options}
            onChange={(e) => {
              e.value ? onChange(e.value) : onChange(e.map((c) => c.value));
              if (typeof setValue === "function") setValue(e);
            }}
            ref={selectRef}
            placeholder={placeholder}
            value={value}
            {...moreProps}
          />
        )}
      />
      <p className={clsx("h-4 text-sm text-red-600")}>{error}</p>
    </div>
  );
};

export default SelectField;
