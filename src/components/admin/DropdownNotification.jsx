import React from "react";
import { Link } from "react-router-dom";
import Icons from "../Icons";
import clsx from "clsx";

const DropdownNotification = () => {
  const [isDropdown, setIsDropdown] = React.useState(false);

  const dropdownList = React.useRef();
  const trigger = React.useRef();

  // handle close dropdown when click outsite
  React.useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdownList.current) return;
      // contains return true if node contains param in dom model
      if (!isDropdown || dropdownList.current.contains(target)) return;

      // return only prevent setIsDropdown(false)
      setIsDropdown(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });
  return (
    <>
      <div className="relative text-sm">
        {/* dropdown start */}
        <Link
          ref={trigger}
          onClick={(e) => {
            // prevent onClick event in document node excecute make isDropdown become false again
            e.stopPropagation();
            setIsDropdown(!isDropdown);
          }}
          className="block"
        >
          {/* ping start */}
          <span className="z-1 absolute -top-0.5 right-0 h-2 w-2 rounded-full bg-red-500">
            <span className="-z-1 absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
          </span>
          {/* ping end */}
          <div className=" rounded-full border border-slate-200 bg-slate-100 p-1">
            <Icons.IconIconNotification className="text-xl text-slate-500   " />
          </div>
        </Link>
        {/* dropdown end */}

        {/* dropdown-list start */}
        <div
          ref={dropdownList}
          className={clsx(
            "absolute right-0 mt-2 max-h-72 w-72 rounded-md border border-slate-200 bg-white  shadow",
            {
              hidden: !isDropdown,
            },
          )}
        >
          <div className="p-2">Notification</div>
          <ul>
            <li className="">
              <div className="border-t border-slate-200 p-2">Item 1</div>
            </li>
            <li className="">
              <div className="border-t border-slate-200 p-2">Item 2</div>
            </li>
            <li className="">
              <div className="border-t border-slate-200 p-2">Item 3</div>
            </li>
          </ul>
        </div>
        {/* dropdown-list end */}
      </div>
    </>
  );
};

export default DropdownNotification;
