import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const user = JSON.parse(localStorage.getItem("user") ?? "{}");
  const location = useLocation();

  return user.refreshToken ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default RequireAuth;
