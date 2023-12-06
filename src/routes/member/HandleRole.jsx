import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const HandleRole = () => {
  const member = useSelector((state) => state.member);

  if (member.data && member.data?.role === "member") return <Outlet />;
  else {
    toast.warning("Required signin");
    return <Navigate to="/signin" />;
  }
};

export default HandleRole;
