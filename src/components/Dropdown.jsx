import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

const Dropdown = (props) => {
  const { children, list, position = "left" } = props;
  const [isDropdown, setIsDropdown] = React.useState(false);
  const dropdownList = React.useRef();
  const trigger = React.useRef();

  // handle close dropdown when click outsite
  React.useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdownList.current) return;
      // contains return true if node contains param in dom model
      if (
        !isDropdown ||
        dropdownList.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;

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
          onClick={() => {
            setIsDropdown(!isDropdown);
          }}
          className="flex items-center gap-3"
        >
          {children}
        </Link>
        {/* dropdown end */}

        {/* dropdown-list start */}
        <div
          ref={dropdownList}
          className={clsx(
            "absolute z-999 mt-2 w-40 min-w-full rounded-md border  border-slate-200 bg-white p-2 shadow",
            `${position === "right" ? "left-0" : "right-0"}`,
            {
              hidden: !isDropdown || !list,
            },
          )}
        >
          {list || null}
        </div>
        {/* dropdown-list end */}
      </div>
    </>
  );
};

export default Dropdown;
