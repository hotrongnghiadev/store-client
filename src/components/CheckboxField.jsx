import clsx from "clsx";
import { Controller } from "react-hook-form";

const CheckboxField = (props) => {
  const {
    fieldId,
    label,
    control,
    defaultValue,
    className,
    value,
    ...moreProps
  } = props;
  return (
    <div className="flex cursor-pointer items-center gap-4">
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={fieldId}
        render={({ field: { onChange } }) => (
          <input
            value={value}
            type="checkbox"
            id={fieldId}
            className={clsx("", className)}
            onChange={(e) => {
              const checkboxValue = e.target.checked ? e.target.value : "";
              onChange(checkboxValue);
            }}
            {...moreProps}
          />
        )}
      />
      <label htmlFor={fieldId} className="">
        {label}
      </label>
    </div>
  );
};

export default CheckboxField;
