import { useDispatch, useSelector } from "react-redux";
import TippyHeadless from "@tippyjs/react/headless";

import * as adminReducer from "../../redux/admin.slice";
import Icons from "../Icons";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { toast } from "react-toastify";

const Account = () => {
  const admin = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(adminReducer.logout());
    toast.success("Logout is successfully");
  };
  return (
    <>
      <div>
        <TippyHeadless
          placement="bottom"
          hideOnClick="true"
          interactive
          trigger="click"
          render={(attrs) => (
            <div className="box" tabIndex="-1" {...attrs}>
              <div className="w-64 border bg-white  p-4 shadow-md">
                {admin.data && (
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
                {!admin.data && (
                  <ul className={clsx("w-full")}>
                    <li className="rounded-md px-2 capitalize ">
                      <Link
                        to="/signin"
                        className="block w-full hover:text-blue-500"
                      >
                        Sigin
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
              {admin?.data?.userName || "Account"}
            </span>
            <Icons.IconCaretDown />
          </button>
        </TippyHeadless>
      </div>
    </>
  );
};

export default Account;
