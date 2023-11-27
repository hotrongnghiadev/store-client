import React from "react";
import clsx from "clsx";
import { Link, NavLink, useLocation } from "react-router-dom";

import logo from "../../assets/images/logo-01.jpg";
import SidebarLinkGroup from "../../components/admin/SidebarLinkGroup";

import Icons from "../../components/Icons";

const Sidebar = (props) => {
  const { pathname } = useLocation();
  const sidebar = React.useRef();
  const { isSidebarOpen, setIsSidebarOpen } = props;

  return (
    <>
      <aside
        ref={sidebar}
        className={clsx(
          "group absolute z-999 h-screen w-72 -translate-x-full overflow-hidden border-r-slate-200 bg-white  px-2 shadow duration-200 ease-linear ",
          {
            "!md:block translate-x-0 md:static": isSidebarOpen,
            "-translate-x-full": !isSidebarOpen,
          },
        )}
      >
        {/* header start */}
        <div className="relative flex items-center py-4">
          <Link to="/" className="flex items-center">
            <div className="h-16 w-16">
              <img src={logo} />
            </div>
            <h1 className="text-xl font-bold capitalize">shop admin</h1>
          </Link>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <div className="absolute right-0 top-2 hidden h-8 w-10 items-center justify-center  rounded-md text-slate-500 hover:bg-slate-200 group-hover:flex">
              <Icons.IconBxChevronsLeft className="text-2xl" />
            </div>
          </button>
        </div>
        {/* header end */}

        {/* menu start */}
        <div className="no-scrollbar h-full overflow-y-auto">
          <nav>
            <h3 className="my-4 font-bold text-slate-500">MENU</h3>
            {/* menu list */}
            <ul className="flex flex-col gap-4">
              {/* dashboard start */}
              <Link
                to="/admin"
                className={clsx(
                  "relative flex items-center rounded-md px-2 py-2 font-bold hover:bg-slate-200",
                  {
                    "text-blue-500":
                      !pathname.split("admin")[1] ||
                      pathname.split("admin")[1] === "/",
                  },
                )}
              >
                <Icons.IconDashboard className="text-2xl" />
                <span className="pl-2 text-lg capitalize">dashboard</span>
              </Link>
              {/* dashboard end */}

              {/* product start */}
              <SidebarLinkGroup activeCondition={pathname.includes("product")}>
                {
                  // passing callback into SidebarLinkGroup
                  (handleClick, isExpland) => (
                    <React.Fragment>
                      {/* dropdown start */}
                      <Link
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                        }}
                        className={clsx(
                          "relative flex items-center rounded-md px-2 py-2 font-bold hover:bg-slate-200",
                          {
                            "text-blue-500": pathname.includes("product"),
                          },
                        )}
                      >
                        <Icons.IconShop className="text-2xl" />
                        <span className="pl-2 text-lg capitalize">product</span>
                        <div
                          className={clsx(
                            "absolute right-2 top-1/2 -translate-y-1/2 transition-transform duration-300",
                            {
                              "-rotate-90": !isExpland,
                            },
                          )}
                        >
                          <Icons.IconDown />
                        </div>
                      </Link>
                      {/* dropdown end */}

                      {/* dropdown-list start */}
                      <div className={clsx({ hidden: !isExpland })}>
                        <ul className="mb-4 mt-2 ">
                          <li>
                            <NavLink
                              to="/admin/product/list"
                              className={({ isActive }) =>
                                clsx(
                                  "block rounded-md px-2 py-2 pl-8 first-letter:uppercase hover:bg-slate-200",
                                  {
                                    "text-blue-500": isActive,
                                  },
                                )
                              }
                            >
                              product list
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/admin/product/create"
                              className={({ isActive }) =>
                                clsx(
                                  "block rounded-md px-2 py-2 pl-8 first-letter:uppercase hover:bg-slate-200",
                                  {
                                    "text-blue-500": isActive,
                                  },
                                )
                              }
                            >
                              product create
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* dropdown-list end */}
                    </React.Fragment>
                  )
                }
              </SidebarLinkGroup>
              {/* product end */}

              {/* brand start*/}
              <Link
                to="/admin/brand"
                className={clsx(
                  "relative flex items-end rounded-md px-2 py-2 font-bold hover:bg-slate-200",
                  {
                    "text-blue-500": pathname.includes("brand"),
                  },
                )}
              >
                <Icons.IconBxBuilding className="text-2xl" />
                <span className="pl-2 text-lg capitalize">brand</span>
              </Link>
              {/* brand end */}

              {/* category start */}
              <Link
                to="/admin/category"
                className={clsx(
                  "relative flex items-end rounded-md px-2 py-2 font-bold hover:bg-slate-200",
                  {
                    "text-blue-500": pathname.includes("category"),
                  },
                )}
              >
                <Icons.IconBxCategoryAlt className="text-2xl" />
                <span className="pl-2 text-lg capitalize">category</span>
              </Link>
              {/* category end */}
            </ul>
          </nav>
        </div>
        {/* menu end */}
      </aside>
    </>
  );
};

export default Sidebar;
