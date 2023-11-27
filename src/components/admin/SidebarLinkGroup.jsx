import React from "react";

const SidebarLinkGroup = ({ children, activeCondition }) => {
  const [isExpland, setIsExpland] = React.useState(activeCondition);

  const handleClick = () => {
    setIsExpland(!isExpland);
  };
  return (
    <>
      {/* similar to passing callback to get data */}
      <li>{children(handleClick, isExpland)}</li>
    </>
  );
};

export default SidebarLinkGroup;
