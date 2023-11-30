import { Controller } from "react-hook-form";

import Icons from "./Icons";
import InputField from "./InputField";
import React from "react";
import clsx from "clsx";

const AdditionalField = (props) => {
  const {
    control,
    fieldId,
    arrayField,
    removeField,
    appendField,
    error = [],
  } = props;

  return (
    <>
      <div>
        <h3 className="font-bold">Additional fields</h3>
        {arrayField.map((field, index) => {
          return (
            <section key={index} className="mt-4">
              <InputField
                control={control}
                fieldId={`${fieldId}.${index}.name`}
                placeholder={
                  error.length > 0 && error[index]?.name
                    ? error[index]?.name.message
                    : "additional field name"
                }
                className={clsx("rounded-md border-none !p-0 font-bold", {
                  "placeholder:text-red-500":
                    error.length > 0 && error[index]?.name,
                })}
              />
              <div className="flex gap-2">
                <InputField
                  control={control}
                  fieldId={`${fieldId}.${index}.content`}
                  placeholder={
                    error.length > 0 && error[index]?.name
                      ? error[index]?.name.message
                      : "additional field content"
                  }
                  className={clsx("rounded-md", {
                    "placeholder:text-red-500":
                      error.length > 0 && error[index]?.name,
                  })}
                />

                <div className="flex flex-col">
                  <button
                    type="submit"
                    onClick={() => removeField(index)}
                    className="flex h-full appearance-none items-center rounded-sm  px-2 placeholder-gray-300 focus-within:ring-1 focus:outline-none"
                  >
                    <Icons.IconRemove className="text-xl text-red-500" />
                  </button>
                </div>
              </div>
            </section>
          );
        })}
        <div className="mt-4 flex w-fit  flex-col justify-center whitespace-nowrap text-sm">
          <button
            type="button"
            onClick={() => appendField({ name: "", content: "" })}
            className="ring-focusborder flex appearance-none justify-center rounded-sm  px-2.5 py-2.5 placeholder-gray-300 focus-within:ring-1 focus:outline-none"
          >
            <Icons.IconAdd className="text-xl text-blue-500" />
          </button>
          <p className="h-4"></p>
        </div>
      </div>
    </>
  );
};

export default AdditionalField;
