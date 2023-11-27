import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const HandleRole = () => {
  const admin = useSelector((state) => state.admin);
  return admin.data && admin.data?.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/admin/signin/invalid" replace={true} />
  );
};

export default HandleRole;
