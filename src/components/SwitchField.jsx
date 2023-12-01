import clsx from "clsx";
import { Controller } from "react-hook-form";

const SwitchField = (props) => {
  const { fieldId, label, control, defaultValue, className, ...moreProps } =
    props;
  return (
    <div className="group mb-8 flex w-full flex-col">
      <label htmlFor={fieldId} className="first-letter:uppercase">
        {label}
      </label>
      <label className="relative mr-5 inline-flex cursor-pointer items-center">
        <Controller
          control={control}
          defaultValue={defaultValue}
          name={fieldId}
          render={({ field: { onChange, value } }) => (
            <input
              value={value}
              checked={!!value}
              type="checkbox"
              id={fieldId}
              className={clsx("peer sr-only", className)}
              onChange={(e) => {
                console.log(e.target);
                // onChange use when useForm mode is onchange and isDirty, isToched active
                onChange(!value);
              }}
              {...moreProps}
            />
          )}
        />
        <div className="peer h-6 w-11 scale-[80%] rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-gray-700"></div>
      </label>
    </div>
  );
};

export default SwitchField;
