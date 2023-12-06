import clsx from "clsx";
import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Icons from "../../components/Icons";
import Logo from "../../assets/images/logo.svg";
import Search from "../../components/Search";

const Sidebar = (props) => {
  const { pathname } = useLocation();
  const sidebar = React.useRef();
  const { isSidebarOpen, setIsSidebarOpen } = props;

  return (
    <>
      <aside
        ref={sidebar}
        className={clsx(
          "group absolute z-999 h-screen w-72 -translate-x-full overflow-hidden border-r-slate-200 bg-white px-2  shadow duration-200 ease-linear lg:absolute lg:-translate-x-full ",
          {
            "!md:block translate-x-0 md:static": isSidebarOpen,
            "-translate-x-full": !isSidebarOpen,
          },
        )}
      >
        {/* header start */}
        <div className="relative flex items-center py-4">
          <Link to="/" className="flex items-center">
            <div className="w-24">
              <img src={Logo} alt="" />
            </div>
          </Link>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <div className="absolute right-0 top-2  flex h-8 w-10 items-center justify-center  rounded-md text-slate-500 hover:bg-slate-200 ">
              <Icons.IconClose className="text-2xl" />
            </div>
          </button>
        </div>
        {/* header end */}

        {/* search start */}
        <Search />
        {/* search end */}

        {/* menu start */}
        <div className="no-scrollbar h-full overflow-y-auto">
          <nav>
            <h3 className="my-4 font-bold text-slate-500">MENU</h3>
            {/* menu list */}
            <ul className="flex flex-col gap-4">
              {/* home start */}
              <Link
                to="/"
                className={clsx(
                  "relative flex items-center rounded-md px-2 py-2 font-bold hover:bg-slate-200",
                  {
                    "text-blue-500": pathname === "/",
                  },
                )}
              >
                <Icons.IconHome className="text-2xl" />
                <span className="pl-2 text-lg capitalize">home</span>
              </Link>
              {/* home end */}

              {/* product start*/}
              <Link
                to="/product"
                className={clsx(
                  "relative flex items-end rounded-md px-2 py-2 font-bold hover:bg-slate-200",
                  {
                    "text-blue-500": pathname.includes("product"),
                  },
                )}
              >
                <Icons.IconShop className="text-2xl" />
                <span className="pl-2 text-lg capitalize">product</span>
              </Link>
              {/* product end */}

              {/* news start */}
              <Link
                to="/news"
                className={clsx(
                  "relative flex items-end rounded-md px-2 py-2 font-bold hover:bg-slate-200",
                  {
                    "text-blue-500": pathname.includes("news"),
                  },
                )}
              >
                <Icons.IconNewspaper className="text-2xl" />
                <span className="pl-2 text-lg capitalize">news</span>
              </Link>
              {/* news end */}

              {/* about start */}
              <Link
                to="/about"
                className={clsx(
                  "relative flex items-end rounded-md px-2 py-2 font-bold hover:bg-slate-200",
                  {
                    "text-blue-500": pathname.includes("about"),
                  },
                )}
              >
                <Icons.IconInfo className="text-2xl" />
                <span className="pl-2 text-lg capitalize">about</span>
              </Link>
              {/* about end */}
            </ul>
          </nav>
        </div>
        {/* menu end */}
      </aside>
    </>
  );
};

export default Sidebar;
