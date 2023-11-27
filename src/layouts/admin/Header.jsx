import React from "react";
import clsx from "clsx";
import Icons from "../../components/Icons";
import DropdownNotification from "../../components/admin/DropdownNotification";
import DropdownUser from "../../components/admin/DropdownUser";

const Header = (props) => {
  const { isSidebarOpen, setIsSidebarOpen } = props;
  return (
    <>
      <header className="sticky top-0 z-99 flex w-full items-center justify-between bg-white p-2 shadow ">
        {/* header-left start */}
        <div className="flex items-center">
          {/* handle show/hidden sidebar */}
          {/* button start */}
          <div>
            <button
              onClick={() => {
                setIsSidebarOpen(!isSidebarOpen);
              }}
            >
              <div
                className={clsx(
                  "flex h-8 w-10 items-center justify-center rounded-md text-slate-500 hover:bg-slate-200",
                  {
                    "lg:hidden ": isSidebarOpen,
                  },
                )}
              >
                <Icons.IconMenuUnfold className="text-2xl" />
              </div>
            </button>
          </div>
          {/* button end */}

          {/* search start */}
          <div className="pl-4">
            <form>
              <div className="group relative flex w-full items-center rounded-md">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Icons.IconSearch className="text-base text-slate-500  group-focus-within:text-blue-500" />
                </button>
                <input
                  type="text"
                  className="rounded-md bg-transparent px-2 py-2 outline-none"
                  placeholder="Click to search..."
                />
              </div>
            </form>
          </div>
          {/* search end */}
        </div>
        {/* header-left end */}

        {/* header-right start */}
        <div className="flex items-center gap-8">
          <DropdownNotification />
          <DropdownUser />
        </div>
        {/* header-right end */}
      </header>
    </>
  );
};

export default Header;
