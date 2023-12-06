import clsx from "clsx";

const Button = (props) => {
  const { type, children, className, onClick, ...moreProps } = props;
  return (
    <>
      <button
        onClick={onClick}
        type={type}
        className={clsx(
          "mb-2 me-2 flex w-fit flex-col rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800",
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
