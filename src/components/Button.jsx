import clsx from "clsx";

const Button = (props) => {
  const { type, children, className, onClick, ...moreProps } = props;
  return (
    <>
      <button
        onClick={onClick}
        type={type}
        className={clsx(
          "flex w-fit flex-col rounded-md bg-blue-500 px-4 py-2 capitalize text-white",
          className,
        )}
        {...moreProps}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
