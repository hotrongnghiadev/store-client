import React from "react";
import Icons from "./Icons";
import clsx from "clsx";

const FilterProduct = (props) => {
  const { open, setOpen } = props;

  return (
    <>
      <div
        className={clsx(
          "fixed left-0 top-0 z-999 h-screen w-full bg-white p-8",
          { hidden: !open },
        )}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute right-2 top-2 rounded-md p-2 text-red-500 hover:bg-slate-200"
        >
          <Icons.IconClose className="text-2xl" />
        </button>

        <div></div>
      </div>
    </>
  );
};

export default FilterProduct;
