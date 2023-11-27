import React, { Children } from "react";
import Icons from "./Icons";

const Modal = (props) => {
  const modal = React.useRef();
  const { children, isOpen, setIsOpen, label } = props;
  const [confirmClose, setConfirmClose] = React.useState(() => (setIsOpen) => {
    setIsOpen(false);
  });
  // effect start
  React.useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!modal.current) return;
      // contains return true if node contains param in dom model
      if (!isOpen || modal.current.contains(target)) return;

      // return only prevent setIsDropdown(false)
      setIsOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => {
      document.removeEventListener("click", clickHandler);
    };
  });
  // effect end

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-999 flex h-screen max-h-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50 p-12">
        <div ref={modal} className="w-full max-w-2xl rounded-md bg-white">
          <div className="flex items-center justify-between border-b p-4 font-bold">
            <h3 className="text-xl capitalize">{label}</h3>
            <button
              onClick={() => {
                confirmClose(setIsOpen);
              }}
              className="rounded-md p-2 hover:bg-slate-200"
            >
              <Icons.IconClose className="text-2xl" />
            </button>
          </div>
          <div className="p-4">
            {React.cloneElement(children, { setConfirmClose })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
