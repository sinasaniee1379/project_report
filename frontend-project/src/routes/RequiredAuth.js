import { Navigate, Outlet, useLocation } from "react-router";
import { useSelector } from "react-redux";

const RequiredAuth = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  let location = useLocation();
  if (!isAuthenticated) {
    return <Navigate replace to={"/"} state={{ from: location }} />;
  }
  return <Outlet />;
};

export default RequiredAuth;
