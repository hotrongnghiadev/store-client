import { Controller } from "react-hook-form";

import Icons from "./Icons";
import uploadImg from "../assets/images/upload.png";
import clsx from "clsx";
import React from "react";

const FileFields = (props) => {
  const {
    validator,
    label,
    control,
    error,
    defaultValue,
    fieldId,
    className,
    ...moreProps
  } = props;

  const [value, setValue] = React.useState([]);

  return (
    <>
      <div className="mt-8 w-full">
        <div className=" mb-2 flex flex-col sm:flex-row sm:flex-wrap">
          {!value.length && (
            <div className="flex w-full justify-center">
              <img src={uploadImg} />
            </div>
          )}
          {value.map((el, index) => (
            <div
              key={index}
              className=" mb-4 flex w-full items-center  justify-center rounded-2xl bg-slate-100 p-4 sm:w-1/2 sm:border-4 sm:border-white lg:w-1/3 "
            >
              <div className="flex justify-center">
                <img
                  src={el.path || el}
                  className="w-10/12 !border-2 !border-dashed !border-slate-500"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="relative h-10 rounded-full bg-gradient-to-l from-blue-500 to-green-500">
          <Controller
            control={control}
            defaultValue={defaultValue}
            name={fieldId}
            render={({ field: { onChange } }) => (
              <input
                {...(validator ?? {})}
                className={clsx(
                  "peer invisible h-full w-full  before:visible before:block before:h-full before:w-full before:cursor-pointer  before:rounded-full before:border-none before:p-2 before:text-center before:outline-none before:transition-colors before:content-['']",
                  className,
                )}
                type="file"
                onChange={(e) => {
                  onChange(e.target.value);
                  if (e.target.files) {
                    const files = e.target.files;
                    let arr = [];
                    for (const key in files) {
                      if (files && files[key] && files[key].type) {
                        arr.push(URL.createObjectURL(files[key]));
                      }
                    }
                    setValue(arr);
                  }
                }}
                {...moreProps}
              />
            )}
          />

          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-white first-letter:uppercase">
            {label}
          </div>
        </div>
        <p
          className={clsx(
            "h-4 pl-4 text-sm text-red-500 peer-focus-within:invisible",
          )}
        >
          {error}
        </p>
      </div>
    </>
  );
};

export default FileFields;
