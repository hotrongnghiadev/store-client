import clsx from "clsx";
import { useRef } from "react";

import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";

const SelectField = (props) => {
  const {
    required,
    error,
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
      <label
        className="first-letter:uppercase"
        onClick={() => selectRef.current.focus()}
      >
        {label}
        {required && <span className="pl-1 text-red-500">*</span>}
      </label>
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={fieldId}
        render={({ field: { onChange, value } }) => {
          return (
            <Select
              value={options.filter((el) => el.value === value)}
              menuPlacement="auto"
              classNames={{
                placeholder: () => "!text-sm",
                menu: () => "!z-99",
                menuList: () => "!p-0",
                container: () => "min-w-fit peer",
                option: (state) =>
                  clsx({
                    "!bg-transparent !text-blue-500": state.isSelected,
                  }),
                control: (state) =>
                  clsx({
                    "!border-blue-500 !shadow-none": state.isFocused,
                    "!border-slate-200": !error && !state.isFocused,
                    "!border-red-500": error && !state.isFocused,
                  }),
              }}
              options={options}
              onChange={(e) => {
                onChange(e.value);
              }}
              ref={selectRef}
              placeholder={placeholder}
              {...moreProps}
            />
          );
        }}
      />
      <p
        className={clsx(
          "h-4 pl-4 text-sm text-red-600 peer-focus-within:invisible",
        )}
      >
        {error}
      </p>
    </div>
  );
};

export default SelectField;
