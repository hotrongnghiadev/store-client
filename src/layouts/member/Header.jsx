import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import * as memberReducer from "../../redux/member.slice";
import Icons from "../../components/Icons";
import Logo from "../../assets/images/logo.svg";
import Dropdown from "../../components/Dropdown";
import Search from "../../components/Search";
import { toast } from "react-toastify";
import TippyHeadless from "@tippyjs/react/headless";

const Header = (props) => {
  const dispatch = useDispatch();
  const member = useSelector((state) => state.member);

  const { isSidebarOpen, setIsSidebarOpen } = props;
  const { pathname } = useLocation();

  // function start
  const handleLogout = () => {
    dispatch(memberReducer.logout());
    toast.success("Logout is successfully");
  };
  // function end
  return (
    <>
      <header className="sticky top-0 z-999  w-full  bg-white shadow">
        {/* header-content start */}
        <div className="flex items-center justify-between px-4 py-2">
          {/* handle show/hidden sidebar */}
          {/* button start */}
          <button
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
            }}
            className={clsx(
              "flex h-8 w-10 items-center justify-center rounded-md text-slate-500 lg:hidden ",
              {
                "md:hidden lg:hidden": isSidebarOpen,
              },
            )}
          >
            <div>
              <Icons.IconBxMenuAltLeft className="text-3xl" />
            </div>
          </button>
          {/* button end */}

          <div className="flex items-center gap-4">
            {/* logo start */}
            <Link to="/" className="">
              <img src={Logo} alt=""></img>
            </Link>
            {/* logo end */}

            {/* search start */}
            <div className="hidden lg:block">
              <Search />
            </div>
            {/* search end */}
          </div>
          {/* cart start */}
          <div className="flex cursor-pointer items-center gap-8 rounded-md px-4 py-2 ">
            <div className="relative">
              <Link to="/cart">
                <Icons.IconBag className="text-2xl" />
              </Link>
              <span className="absolute -right-3 -top-3 flex h-4 w-4 items-center justify-center rounded-full bg-orange-400 p-2.5 text-xs text-white">
                {member.data ? member.data.cart?.length : "?"}
              </span>
            </div>
            {/* account start */}

            <TippyHeadless
              placement="bottom"
              hideOnClick="true"
              interactive
              trigger="click"
              render={(attrs) => (
                <div className="box" tabIndex="-1" {...attrs}>
                  <div className="w-64 border bg-white  p-4 shadow-md">
                    {member.data && (
                      <ul className="w-full">
                        <li className="rounded-md px-2 capitalize ">
                          <button className="block w-full hover:text-blue-500">
                            Change avatar
                          </button>
                        </li>
                        <li className="rounded-md px-2 capitalize ">
                          <button className="block w-full hover:text-blue-500">
                            Change password
                          </button>
                        </li>
                        <li className="rounded-md px-2 capitalize ">
                          <button
                            onClick={() => handleLogout()}
                            className="block w-full hover:text-blue-500"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    )}
                    {!member.data && (
                      <ul className={clsx("w-full")}>
                        <li className="rounded-md px-2 capitalize ">
                          <Link
                            to="/signin"
                            className="block w-full hover:text-blue-500"
                          >
                            Sigin
                          </Link>
                        </li>
                        <li className="rounded-md px-2 capitalize ">
                          <Link
                            to="/signup"
                            className="block w-full hover:text-blue-500"
                          >
                            Signup
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              )}
            >
              <button className="flex">
                <span className="font-bold capitalize">
                  {member?.data?.userName || "Account"}
                </span>
                <Icons.IconCaretDown />
              </button>
            </TippyHeadless>

            {/* account end */}
          </div>
          {/* cart end */}
        </div>
        {/* header-content end */}

        {/* header-menu */}
        <div className="hidden h-16 bg-primary px-4 lg:block">
          <div className="container-lg mx-auto flex h-full items-center gap-8 text-black">
            <div className="mt-2 h-14 w-72 rounded-t-md bg-white">
              <button className="flex h-full w-full items-center justify-between px-4">
                <div className="flex items-center gap-2">
                  <Icons.IconBxCategoryAlt className="text-2xl" />
                  <span className="font-bold capitalize">all categories</span>
                </div>
                <div>
                  <Icons.IconDown />
                </div>
              </button>
            </div>

            <nav>
              <ul className="flex gap-8 ">
                {/* home start */}
                <Link
                  to="/"
                  className={clsx(
                    "relative flex items-center rounded-md px-2 py-2 font-bold ",
                    {
                      "bg-slate-600 text-white": pathname.includes("home"),
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
                    "relative flex items-end rounded-md px-2 py-2 font-bold ",
                    {
                      "bg-slate-600 text-white": pathname.includes("product"),
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
                    "relative flex items-end rounded-md px-2 py-2 font-bold ",
                    {
                      "bg-slate-600 text-white": pathname.includes("news"),
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
                    "relative flex items-end rounded-md px-2 py-2 font-bold ",
                    {
                      "bg-slate-600 text-white": pathname.includes("about"),
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
        </div>
        {/* header-menu */}
      </header>
    </>
  );
};

export default Header;
