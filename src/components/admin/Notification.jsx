import Dropdown from "../Dropdown";
import Icons from "../Icons";

const Notification = () => {
  return (
    <>
      <Dropdown
        list={
          <>
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
          </>
        }
      >
        {/* ping start */}
        <span className="z-1 absolute -top-0.5 right-0 h-2 w-2 rounded-full bg-red-500">
          <span className="-z-1 absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
        </span>
        {/* ping end */}
        <div className=" rounded-full border border-slate-200 bg-slate-100 p-1">
          <Icons.IconIconNotification className="text-xl text-slate-500   " />
        </div>
      </Dropdown>
    </>
  );
};

export default Notification;
