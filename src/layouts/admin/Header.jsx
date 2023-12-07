import clsx from "clsx";
import Icons from "../../components/Icons";
import Notification from "../../components/admin/Notification";
import Account from "../../components/admin/Account";
import Search from "../../components/Search";

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
                    "md:hidden lg:hidden ": isSidebarOpen,
                  },
                )}
              >
                <Icons.IconMenuUnfold className="text-2xl" />
              </div>
            </button>
          </div>
          {/* button end */}

          {/* search start */}
          <div className="w-96">
            <Search />
          </div>
          {/* search end */}
        </div>
        {/* header-left end */}

        {/* header-right start */}
        <div className="flex items-center gap-8">
          <Notification />
          <Account />
        </div>
        {/* header-right end */}
      </header>
    </>
  );
};

export default Header;
