import clsx from "clsx";
import { Controller } from "react-hook-form";

const InputField = (props) => {
  const {
    messengeOff,
    required,
    fieldId,
    label,
    icon,
    control,
    defaultValue,
    className,
    error,
    setValue,
    type,
    setFiles,
    validator,
    ...moreProps
  } = props;

  const Comp = type === "textarea" ? "textarea" : "input";
  return (
    <div className="group mt-4 flex w-full flex-col">
      <label htmlFor={fieldId} className="first-letter:uppercase">
        {label}
        {required && <span className="pl-1 text-red-500">*</span>}
      </label>

      <div className="group/field peer relative z-10">
        <span className=" absolute right-0 flex h-full items-center pr-3 text-xl text-slate-400 group-focus-within/field:text-blue-500">
          {icon}
        </span>
        <Controller
          control={control}
          defaultValue={defaultValue}
          name={fieldId}
          render={({ field: { onChange } }) => (
            <Comp
              autoComplete="off"
              type={type ?? "text"}
              id={fieldId}
              className={clsx(
                "peer w-full appearance-none border border-slate-200 px-4 py-2 placeholder-slate-400 transition-colors  focus:outline-none focus:ring-1 focus:ring-transparent",
                {
                  "ring-1 ring-red-500": error,
                },
                className,
              )}
              {...(validator ?? {})}
              onChange={(e) => {
                // onChange use when useForm mode is onchange and isDirty, isToched active
                onChange(e.target.value);
                if (type === "file") {
                  if (e.target.files) {
                    const files = e.target.files;
                    let arr = [];
                    for (const key in files) {
                      if (files && files[key] && files[key].type) {
                        arr.push(URL.createObjectURL(files[key]));
                      }
                    }
                    setFiles(arr);
                  }
                } else {
                  if (typeof setValue === "function") setValue(e.target.value);
                }
              }}
              {...moreProps}
            />
          )}
        />
        <span className="absolute left-0 top-0 -z-10 block h-full w-full rounded-full"></span>
      </div>
      {!messengeOff && (
        <p
          className={clsx(
            "h-4 pl-4 text-sm text-red-500 peer-focus-within:invisible",
          )}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
