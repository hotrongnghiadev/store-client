import Dropdown from "../Dropdown";
import Icons from "../Icons";

const Account = () => {
  return (
    <>
      <Dropdown
        list={
          <>
            <div className="p-2">User</div>
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
          </>
        }
      >
        <div className=" rounded-full border border-slate-200 bg-slate-100 p-1">
          <Icons.IconBxsUser className="text-xl text-slate-500   " />
        </div>
      </Dropdown>
    </>
  );
};

export default Account;
